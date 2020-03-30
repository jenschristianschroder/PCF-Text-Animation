import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class SpinningText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private controlId: string;
	private svgContainer: HTMLDivElement;
	private svgContent: string;
	private text: string;
	private color: string;
	private background: string;
	private font: string;
	private fontsize: number;
	private fontweight: number;
	private spacing: number;
	private clockwise: boolean;
	private duration: number;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this.controlId = Random.newString();

		this.svgContent = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 500 500'><defs><path d='M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250' id='textcircle' transform='rotate(84.5615 250 250)'>        <animateTransform attributeName='transform' begin='0s' dur='10s' type='rotate' from='360 250 250' to='0 250 250' repeatCount='indefinite'></animateTransform>    </path><symbol><rect x='0' y='0' width='100%' height='100%' id='redstripe'></rect></symbol>    <style>        text {             font-size: 30px;            font-family: Franklin Gothic, sans-serif;            font-weight: 900;             text-transform: uppercase;            letter-spacing: 22px;        }    </style></defs><text dy='70' textLength='1220'><textPath id='textContainer' xlink:href='#textcircle'>Loading important things...</textPath></text></svg>";

		// Need to track container resize so that control could get the available width. The available height won't be provided even this is true
		context.mode.trackContainerResize(true);

		this.svgContainer = document.createElement("div");
		this.svgContainer.setAttribute("id", this.controlId);
		this.svgContainer.innerHTML = this.svgContent;
		container.appendChild(this.svgContainer);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		if(context.parameters.text != null){
			if(context.parameters.text.raw != null)
				this.text = context.parameters.text.raw.toString();
		}
		
		if(context.parameters.color != null){
			if(context.parameters.color.raw != null)
				this.color = context.parameters.color.raw.toString();
		}
		
		if(context.parameters.background != null){
			if(context.parameters.background.raw != null)
				this.background = context.parameters.background.raw.toString();
		}

		if(context.parameters.font != null){
			if(context.parameters.font.raw != null)
				this.font = context.parameters.font.raw.toString();
		}

		if(context.parameters.fontsize != null){
			if(context.parameters.fontsize.raw != null)
				this.fontsize = context.parameters.fontsize.raw;
		}

		if(context.parameters.fontweight != null){
			if(context.parameters.fontweight.raw != null)
				this.fontweight = context.parameters.fontweight.raw;
		}

		if(context.parameters.spacing != null){
			if(context.parameters.spacing.raw != null)
				this.spacing = context.parameters.spacing.raw;
		}

		if(context.parameters.clockwise != null){
			if(context.parameters.clockwise.raw != null)
				this.clockwise = context.parameters.clockwise.raw;
		}

		if(context.parameters.duration != null){
			if(context.parameters.duration.raw != null)
				this.duration = context.parameters.duration.raw;
		}

		// Add code to update control view
		this.svgContent = this.configureText(this.text, this.color, this.background, this.font, this.fontsize, this.fontweight, this.spacing, this.duration);
		this.svgContainer.innerHTML = this.svgContent;
	}

	// configure the svg element according to input	
	private configureText(text: string, color: string, background: string, font: string, fontsize: number, fontweight: number, spacing: number, duration: number) {
		var direction = "";
		if(this.clockwise)
			direction = "from='0 250 250' to='360 250 250'";
		else
			direction = "from='360 250 250' to='0 250 250'";

		return "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 500 500'><defs><path d='M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250' id='" + this.controlId + "textcircle'><animateTransform attributeName='transform' begin='0s' dur='" + duration + "s' type='rotate' " + direction + " repeatCount='indefinite'></animateTransform></path></defs><text><textPath style='fill: " + color + "; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px;' id='textContainer' xlink:href='#" + this.controlId + "textcircle'>" + text + "</textPath></text></svg>";
	}


	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}

class Random {
	static newString() {
	  return 'axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
		  v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	  });
	}
  }