import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class MirrorText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private controlId: string;

	private svgContainer: HTMLDivElement;
	private svgContent: string;
	private text: string;
	private controlWidth: number;
	private controlHeight: number;
	private color: string;

	private padding: Padding;

	private horizontalAlignment: string;// HorizontalAlignment;
	private verticalAlignment: string;// VerticalAlignment;
	
	private font: string;
	private fontsize: number;
	private fontweight: number;
	private spacing: number;

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

		this.padding = new Padding(0, 0, 0, 0);
		
		// Need to track container resize so that control could get the available width. The available height won't be provided even this is true
		context.mode.trackContainerResize(true);

		this.svgContainer = document.createElement('div');
		this.svgContainer.setAttribute('id', this.controlId);
		container.appendChild(this.svgContainer);

		this.svgContent = "Set properties of control";
		this.svgContainer.innerHTML = this.svgContent;

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

				
		if(context.parameters.verticalAlignment != null){
			if(context.parameters.verticalAlignment.raw != null)
				this.verticalAlignment = context.parameters.verticalAlignment.raw;
		}

		if(context.parameters.horizontalAlignment != null){
			if(context.parameters.horizontalAlignment.raw != null)
				this.horizontalAlignment = context.parameters.horizontalAlignment.raw;
		}
		
		/* 
		if(context.parameters.verticalAlignment != null){
			if(context.parameters.verticalAlignment.raw != null)
				this.verticalAlignment = VerticalAlignment[context.parameters.verticalAlignment.raw];
		}

		if(context.parameters.horizontalAlignment != null){
			if(context.parameters.horizontalAlignment.raw != null)
				this.horizontalAlignment = HorizontalAlignment[context.parameters.horizontalAlignment.raw];
		}
 		 */
		if(context.parameters.paddingLeft != null){
			if(context.parameters.paddingLeft.raw != null)
				this.padding.left = context.parameters.paddingLeft.raw;
		}

		if(context.parameters.paddingRight != null){
			if(context.parameters.paddingRight.raw != null)
				this.padding.right = context.parameters.paddingRight.raw;
		}

		if(context.parameters.paddingTop != null){
			if(context.parameters.paddingTop.raw != null)
				this.padding.top = context.parameters.paddingTop.raw;
		}

		if(context.parameters.paddingBottom != null){
			if(context.parameters.paddingBottom.raw != null)
				this.padding.bottom = context.parameters.paddingBottom.raw;
		}

		if(context.parameters.controlwidth != null){
			if(context.parameters.controlwidth.raw != null)
				this.controlWidth = context.parameters.controlwidth.raw;
		}

		if(context.parameters.controlheight != null){
			if(context.parameters.controlheight.raw != null)
				this.controlHeight = context.parameters.controlheight.raw;
		}
 
		this.svgContent = this.configureText(this.text, this.color, this.font, this.fontsize, this.fontweight, this.spacing, this.padding, this.horizontalAlignment, this.verticalAlignment);
		this.svgContainer.innerHTML = this.svgContent;
	}


	// calculate length (pixel) of text
	private getTextSize(text: string, font: string, fontsize: number, fontweight: number, spacing: number) {
		var hiddenDivContainer =  document.createElement('div');
		hiddenDivContainer.style.visibility = "hidden";

		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.fontFamily = font;
		hiddenDiv.style.fontSize = fontsize.toString() + "px";
		hiddenDiv.style.fontWeight = fontweight.toString();
		hiddenDiv.style.letterSpacing = spacing.toString() + "px";
		hiddenDiv.style.position = "absolute";
		hiddenDiv.innerText = text;
		hiddenDivContainer.appendChild(hiddenDiv);
		this.svgContainer.appendChild(hiddenDivContainer);
		var textWidth = parseInt(hiddenDiv.clientWidth.toString());
		var textHeight = parseInt(hiddenDiv.clientHeight.toString());
		return { width: textWidth, height: textHeight };
	}

	// configure the svg element according to input	
	private configureText(text: string, color: string, font: string, fontsize: number, fontweight: number, spacing: number, padding: Padding, horizontalAlignment: string, verticalAlignment: string): string {
		if(font.indexOf(" ") > -1) {
			font = "\"" + font + "\"";
		}
		let randomString = Random.newString();
		
		var textSize = this.getTextSize(text, font, fontsize, fontweight, spacing);

		var px = 0;
		var py = 0;

		if(this.controlHeight > 0 && this.controlWidth > 0)
		{
			px = 0;
			if(horizontalAlignment == HorizontalAlignment.Right) {
				px = this.controlWidth - textSize.width - padding.right;
			}
			else if(horizontalAlignment == HorizontalAlignment.Center) {
				px = this.controlWidth/2 - textSize.width/2;
			}
			else {
				px = padding.left;
			}
			
			py = 0;
			if(verticalAlignment == VerticalAlignment.Bottom) {
				py = this.controlHeight - textSize.height - padding.bottom;
			}
			else if(verticalAlignment == VerticalAlignment.Middle) {
				py = this.controlHeight/2;
			}
			else {
				py = textSize.height + padding.top;
			}
		}
				
	 /* 
		var px = this.controlWidth/2 - textSize.width/2;
		var py = this.controlHeight/2;
  */
		let svgstring = "<svg width='" + (this.controlWidth - 10) + "' height='" + (this.controlHeight - 10) + "' viewBox='0 0 " + this.controlWidth + " " + this.controlHeight + "'>" +
							"<defs>" +
 
								"<linearGradient id='" + randomString + "fadeReflection' y2='100%' x2='0%'>" +
									"<stop stop-color='" + color + "' stop-opacity='0' offset='0.2'/>" +
									"<stop stop-color='" + color + "' stop-opacity='0.1' offset='0.5'/>" +
									"<stop stop-color='" + color + "' stop-opacity='0.4' offset='0.8'/>" +
								"</linearGradient>" +
 
							"</defs>" +
							"<g class='container' transform='translate(" + px + "," + py + ")'>" +
								"<use style='transform: rotateX(180deg)' xlink:href='#" + randomString + "text' fill='url(#" + randomString + "fadeReflection)'/>" +
								"<g fill='" + color + "'>" +
									"<text style='font-family: \"" + font + "\"; font-size: " + fontsize + "px; font-weight: " + fontweight + "; letter-spacing: " + spacing + "px;' id='" + randomString + "text'>" + text + "</text>" +
								"</g>" +
							"</g>" +
						"</svg>";


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

class Padding {
	constructor(left: number, right: number, top: number, bottom: number)
	{
		this.left = left;
		this.right = right;
		this.top = top;
		this.bottom = bottom;
	}
	public left: number;
	public right: number;
	public top: number;
	public bottom: number;
}

enum VerticalAlignment {
	Top = "Top",
	Middle = "Middle",
	Bottom = "Bottom"
}

enum HorizontalAlignment {
	Left = "Left",
	Center = "Center",
	Right = "Right"
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