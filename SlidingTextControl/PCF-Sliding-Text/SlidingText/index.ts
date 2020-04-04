import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class SlidingText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

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
	private lefttoright: boolean;
	private duration: number;
	private repeat: string;
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

		this.svgContent = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 500 500'><defs><path d='M 0,0  L 500,0' id='textpath'><animateTransform attributeName='transform' begin='0s' dur='10s' type='translate' from='1000 250' to='-500 250' repeatCount='indefinite'></animateTransform></path><style>text { fill: black; font-size: 10px; font-family: 'Open Sans'; font-weight: 900; letter-spacing: 2px;}</style></defs><text><textPath id='textContainer' xlink:href='#textpath'>Sliding important text...</textPath></text></svg>";

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

		if(context.parameters.duration != null){
			if(context.parameters.duration.raw != null)
				this.duration = context.parameters.duration.raw;
		}

		if(context.parameters.repeat != null){
			if(context.parameters.repeat.raw != null)
				this.repeat = context.parameters.repeat.raw;
		}

		if(context.parameters.lefttoright != null){
			if(context.parameters.lefttoright.raw != null)
				this.lefttoright = context.parameters.lefttoright.raw;
		}
		// Add code to update control view
		this.svgContent = this.configureText(this.text, this.color, this.background, this.font, this.fontsize, this.fontweight, this.spacing, this.lefttoright, this.duration, this.repeat);
		this.svgContainer.innerHTML = this.svgContent;
	}

	// configure the svg element according to input	
	private configureText(text: string, color: string, background: string, font: string, fontsize: number, fontweight: number, spacing: number, lefttoright: boolean, duration: number, repeat: string) {
		let textlength = text.length;
		
		var direction = "";
		if(lefttoright)
			direction = "from='-500 0' to='500 0'";
		else
			direction = "from='500 0' to='-500 0'";
		if(font.indexOf(" ") > -1) {
			font = "\"" + font + "\"";
		}
		let randomString = Random.newString();
		
		return "<svg viewBox='0 0 500 " + (fontsize * 1.2) + "'><defs><path d='M 0," + fontsize / 3 + " 1500," + fontsize / 3 + "' id='" + randomString + "textpath'><animateTransform attributeName='transform' begin='0s' dur='" + duration + "s' type='translate ' " + direction + " repeatCount='" + repeat + "'></animateTransform></path></defs><text id='" + randomString + "text' transform='translate(0, " + fontsize/2 + ")' style='fill: " + color + "; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px;'><textPath id='" + randomString + "textContainer' xlink:href='#" + randomString + "textpath'>" + text + "</textPath></text></svg>";
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