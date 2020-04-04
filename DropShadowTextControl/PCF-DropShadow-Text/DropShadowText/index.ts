import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class DropShadowText implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	private controlId: string;

	private svgContainer: HTMLDivElement;
	private svgContent: string;
	private text: string;
	private controlWidth: number;
	private controlHeight: number;
	private color: string;
	
	private font: string;
	private fontsize: number;
	private fontweight: number;
	private spacing: number;
	
	private shadowcolor: string;
	private shadowblur: number;
	private shadowxoffset: number;
	private shadowyoffset: number;
	private shadowscale: number;

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

		this.svgContent = "<svg viewBox='0 0 500 30'><defs><style>text { font-size: 30px; font-family: Franklin Gothic, sans-serif; font-weight: 100; text-transform: uppercase; letter-spacing: 0px; } </style></defs><text x='0' y='30'>This is my pulsing text<animate attributeType='XML' attributeName='fill' values='#800;#f00;#800;#800' dur='1s' repeatCount='indefinite'/></text></svg>";


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
		//this.shadowxoffset = 6;
		//this.shadowyoffset = 6;
		// Add code to update control view
		// Add code to update control view
		if(context.parameters.text != null){
			if(context.parameters.text.raw != null)
				this.text = context.parameters.text.raw.toString();
		}
		

		if(context.parameters.controlwidth != null){
			if(context.parameters.controlwidth.raw != null)
				this.controlWidth = context.parameters.controlwidth.raw;
		}

		if(context.parameters.controlheight != null){
			if(context.parameters.controlheight.raw != null)
				this.controlHeight = context.parameters.controlheight.raw;
		}

		if(context.parameters.color != null){
			if(context.parameters.color.raw != null)
				this.color = context.parameters.color.raw.toString();
		}

		if(context.parameters.shadowcolor != null){
			if(context.parameters.shadowcolor.raw != null)
				this.shadowcolor = context.parameters.shadowcolor.raw.toString();
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

		if(context.parameters.shadowblur != null){
			if(context.parameters.shadowblur.raw != null)
				this.shadowblur = context.parameters.shadowblur.raw;
		}

 		
		if(context.parameters.shadowxoffset != null){
			if(context.parameters.shadowxoffset.raw != null)
				this.shadowxoffset = parseInt(context.parameters.shadowxoffset.raw);
		}
		
		if(context.parameters.shadowyoffset != null){
			if(context.parameters.shadowyoffset.raw != null)
				this.shadowyoffset = parseInt(context.parameters.shadowyoffset.raw);
		}

		if(context.parameters.shadowscale != null){
			if(context.parameters.shadowscale.raw != null)
				this.shadowscale = context.parameters.shadowscale.raw;
		}
		
 
		// Add code to update control view
		this.svgContent = this.configureText(this.text, this.color, this.font, this.fontsize, this.fontweight, this.spacing, this.shadowcolor, this.shadowblur, this.shadowxoffset, this.shadowyoffset, this.shadowscale);
		this.svgContainer.innerHTML = this.svgContent;
	}

	// configure the svg element according to input	
	private configureText(text: string, color: string, font: string, fontsize: number, fontweight: number, spacing: number, shadowcolor: string, shadowblur: number, shadowxoffset: number, shadowyoffset: number, shadowscale: number) {
		if(font.indexOf(" ") > -1) {
			font = "\"" + font + "\"";
		}
		let randomString = Random.newString();
		
		let svgstring = "<svg width='" + this.controlWidth + "' height='" + this.controlHeight + "'  viewBox='0 0 500 500'>" +
        					"<g x='0' y='0' transform='translate(" + shadowxoffset + "," + shadowyoffset + ") scale(" + shadowscale + ")'>" +
            					"<defs>" +
                					"<filter id='" + randomString + "shadow' width='1000%' height='1000%'>" +
                    					"<feOffset dx='0' dy='0' result='o'/>" +
                    					"<feGaussianBlur stdDeviation='" + shadowblur + " " + shadowblur + "' result='shadow' in='o'/>" +
                					"</filter>" +
            					"</defs>" +
            					"<text style='text-anchor: middle; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px; filter: url(#" + randomString + "shadow); fill: " + shadowcolor + "'>" +
                					text +
            					"</text>" +
        					"</g>" + 
							"<text transform='translate(250,250)'  style='text-anchor: middle; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px; fill: " + color + "'>" +
								text
							"</text>" +
    					"</svg>"

		//return "<svg width='" + this.controlWidth + "' height='" + this.controlHeight + "' viewBox='0 0 500 500'><defs><filter id='" + randomString + "shadow' x='-" + this.controlWidth/2 + "' y='-" + this.controlHeight/2 + "' width='" + this.controlWidth + "' height='" + this.controlHeight + "'><feGaussianBlur stdDeviation='" + shadowblur + " " + shadowblur + "' result='shadow'/><feOffset dx='" + shadowxoffset + "' dy='" + shadowyoffset + "'/></filter></defs><text x='50%' y='50%' style='text-anchor: middle; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px; filter: url(#" + randomString + "shadow); fill: " + shadowcolor + "'>" + text + "</text><text id='textContainer' x='50%' y='50%' style='text-anchor: middle; font-size: " + fontsize + "px; font-family: " + font + "; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px; fill: " + color + "'>" + text + "</text></svg>";
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