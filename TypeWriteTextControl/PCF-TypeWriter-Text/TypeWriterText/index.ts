import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class TypeWriterText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private controlId: string;

	private svgContainer: HTMLDivElement;
	private svgContent: string;
	private text: string;
	private color: string;
	
	private font: string;
	private fontsize: number;
	private fontweight: number;
	private spacing: number;
	
	private repeat: string;
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

		this.svgContent = "<svg viewBox='0 0 500 30'><path id='a8bd933df1160a92d3e2149af913d542path'><animate attributeName='d' from='m0,30 h0' to='m0,30 h1100' dur='6' begin='0s' repeatCount='indefinite'></animate></path><text><textPath xlink:href='#a8bd933df1160a92d3e2149af913d542path' style='fill: black; font-size: 30px; font-family:&quot;courier&quot;; font-weight: 400; letter-spacing: undefinedpx;'>Text with typewriter effect</textPath></text></svg>";

		// Need to track container resize so that control could get the available width. The available height won't be provided even this is true
		context.mode.trackContainerResize(true);

		this.svgContainer = document.createElement('div');
		this.svgContainer.setAttribute('id', this.controlId);
		this.svgContainer.innerHTML = this.svgContent;
		container.appendChild(this.svgContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
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
 		
		
		this.svgContent = this.configureText(this.text, this.color, this.font, this.fontsize, this.fontweight, this.spacing, this.duration, this.repeat);
		this.svgContainer.innerHTML = this.svgContent;

	}

	// configure the svg element according to input	
	private configureText(text: string, color: string, font: string, fontsize: number, fontweight: number, spacing: number, duration: number, repeat: string) {
		if(font.indexOf(" ") > -1) {
			font = "\"" + font + "\"";
		}
		let randomString = Random.newString();
		
		let svgstring = "<svg viewBox='0 0 500 " + (fontsize * 1.2) + "'>" +
							"<path id='" + randomString + "path'>" +
								"<animate attributeName='d' from='m0," + fontsize + "  h0' to='m0," + fontsize + "  h1100' dur='" + duration + "' begin='0s' repeatCount='" + repeat + "'/>" +
							"</path>" +
							"<text >" +
								"<textPath xlink:href='#" + randomString + "path' style='fill: " + color + "; font-size: " + fontsize + "px; font-family:\"" + font + "\"; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px;'>" + 
									text +
								"</textPath>" +
							"</text>" +
						"</svg>"

		return svgstring;
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