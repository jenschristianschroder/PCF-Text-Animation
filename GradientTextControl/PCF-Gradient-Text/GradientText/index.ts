import {IInputs, IOutputs} from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { randomBytes } from "crypto";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class GradientText implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Cached context object for the latest updateView
	private contextObj: ComponentFramework.Context<IInputs>;

	// Control id to isolate effects
	private controlId: string;

	// Control elements
	private svgContainer: HTMLDivElement;

	// Core properties
	private controlWidth: number;
	private controlHeight: number;

	// Gradient properties
	private gradient: string;//Gradient;
	private gradientElement: string;

	private shape: string;//Shape;
	private shapeElement: string;

	private rotation: number;
	private offsetStart: number;
	private offsetEnd: number;

	// Text properties
	private text: string;
	private textcolor: string;
	private font: string;
	private fontsize: number;
	private fontweight: number;
	private spacing: number;

	private padding: Padding;

	private horizontalAlignment: string;// HorizontalAlignment;
	private verticalAlignment: string;// VerticalAlignment;
	

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

		this.contextObj = context

		// Create svg container div.
		this.svgContainer = document.createElement("div");
		this.svgContainer.classList.add("svg-container");
		this.svgContainer.setAttribute("id", "svg-container");
		this.svgContainer.innerHTML = "Configure control properties";
		container.appendChild(this.svgContainer);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		var offset: number;
		var color: string;
		var gradients: string = "";

		// Add code to update control view
		this.contextObj = context

		// Core properties
		if(this.contextObj.parameters.controlWidth != null){
			if(this.contextObj.parameters.controlWidth.raw != null)
				this.controlWidth = this.contextObj.parameters.controlWidth.raw;
		}
		if(this.contextObj.parameters.controlHeight != null){
			if(this.contextObj.parameters.controlHeight.raw != null)
				this.controlHeight = this.contextObj.parameters.controlHeight.raw;
		}

		// Text properties
		if(this.contextObj.parameters.text != null){
			if(this.contextObj.parameters.text.raw != null)
				this.text = this.contextObj.parameters.text.raw.toString();
		}
		
		if(this.contextObj.parameters.textcolor != null){
			if(this.contextObj.parameters.textcolor.raw != null)
				this.textcolor = this.contextObj.parameters.textcolor.raw.toString();
		}

		if(this.contextObj.parameters.font != null){
			if(this.contextObj.parameters.font.raw != null)
				this.font = this.contextObj.parameters.font.raw.toString();
		}

		if(this.contextObj.parameters.fontsize != null){
			if(this.contextObj.parameters.fontsize.raw != null)
				this.fontsize = this.contextObj.parameters.fontsize.raw;
		}

		if(this.contextObj.parameters.fontweight != null){
			if(this.contextObj.parameters.fontweight.raw != null)
				this.fontweight = this.contextObj.parameters.fontweight.raw;
		}

		if(this.contextObj.parameters.spacing != null){
			if(this.contextObj.parameters.spacing.raw != null)
				this.spacing = this.contextObj.parameters.spacing.raw;
		}

				
		if(this.contextObj.parameters.verticalAlignment != null){
			if(this.contextObj.parameters.verticalAlignment.raw != null)
				this.verticalAlignment = this.contextObj.parameters.verticalAlignment.raw;
		}

		if(this.contextObj.parameters.horizontalAlignment != null){
			if(this.contextObj.parameters.horizontalAlignment.raw != null)
				this.horizontalAlignment = this.contextObj.parameters.horizontalAlignment.raw;
		}
		
		// Gradient properties
		if(this.contextObj.parameters.rotation != null){
			if(this.contextObj.parameters.rotation.raw != null)
				this.rotation = this.contextObj.parameters.rotation.raw;
		}
		if(this.contextObj.parameters.controlWidth != null){
			if(this.contextObj.parameters.controlWidth.raw != null)
				this.controlWidth = this.contextObj.parameters.controlWidth.raw;
		}
		if(this.contextObj.parameters.controlHeight != null){
			if(this.contextObj.parameters.controlHeight.raw != null)
				this.controlHeight = this.contextObj.parameters.controlHeight.raw;
		}
		if(this.contextObj.parameters.offsetStart != null){
			if(this.contextObj.parameters.offsetStart.raw != null)
				this.offsetStart = this.contextObj.parameters.offsetStart.raw;
		}
		if(this.contextObj.parameters.offsetEnd != null){
			if(this.contextObj.parameters.offsetEnd.raw != null)
			this.offsetEnd = this.contextObj.parameters.offsetEnd.raw;
		}

		if(this.contextObj.parameters.shape != null){
			if(this.contextObj.parameters.shape.raw != null)
				this.shape = this.contextObj.parameters.shape.raw;
		}

		if(this.contextObj.parameters.gradient != null){
			if(this.contextObj.parameters.gradient.raw != null)
				this.gradient = this.contextObj.parameters.gradient.raw;
		}


		var textSize = this.getTextSize(this.text, this.font, this.fontsize, this.fontweight, this.spacing);

		var px = 0;
		var py = 0;

		if(this.controlHeight > 0 && this.controlWidth > 0)
		{
			px = 0;
			if(this.horizontalAlignment == HorizontalAlignment.Right) {
				px = this.controlWidth - textSize.width - this.padding.right;
			}
			else if(this.horizontalAlignment == HorizontalAlignment.Center) {
				px = this.controlWidth/2 - textSize.width/2;
			}
			else {
				px = this.padding.left;
			}
			
			py = 0;
			if(this.verticalAlignment == VerticalAlignment.Bottom) {
				py = this.controlHeight - textSize.height - this.padding.bottom;
			}
			else if(this.verticalAlignment == VerticalAlignment.Middle) {
				py = this.controlHeight/2;
			}
			else {
				py = textSize.height + this.padding.top;
			}
		}

		if(!this.contextObj.parameters.GradientDataSet.loading){
			if(this.contextObj.parameters.GradientDataSet.sortedRecordIds.length > 0)
			{
				for(let currentRecordId of this.contextObj.parameters.GradientDataSet.sortedRecordIds){
					offset = parseInt(this.contextObj.parameters.GradientDataSet.records[currentRecordId].getFormattedValue("offset"));
					color = this.contextObj.parameters.GradientDataSet.records[currentRecordId].getFormattedValue("color");
					gradients = gradients +  "<stop offset='" + offset.toString() + "%'  stop-color='" + color + "' />";
				}

				var ratio = 1;
				if(this.controlWidth != null && this.controlHeight != null)
					 ratio = this.controlHeight / this.controlWidth;
					 
				if(this.gradient == Gradient.Linear) {
					this.gradientElement = "<linearGradient id='" + this.controlId + "gradientFill' gradientUnits='userSpaceOnUse' x1='" + 0 + "' x2='" + textSize.width + "' y1='100%' y2='100%' gradientTransform='rotate(" + this.rotation?.toString() + ", " + this.controlWidth/2 + ", " + this.controlHeight/2 + ")'>" +
						gradients +
					"</linearGradient>";
				}
				else {
					this.gradientElement = "<radialGradient id='" + this.controlId + "gradientFill' gradientUnits='userSpaceOnUse' cx='" + this.offsetStart + "%' cy='" + this.offsetEnd + "%' r='50%' fx='" + this.offsetStart + "%' fy='" + this.offsetEnd + "%' gradientTransform='rotate(" + this.rotation?.toString() + ", " + this.controlWidth/2 + ", " + this.controlHeight/2 + ")'>" +
						gradients +
					"</radialGradient>";
				}
			}
		}

		let svgstring = "<svg width='" + (this.controlWidth - 10) + "' height='" + (this.controlHeight - 10) + "' viewBox='0 0 " + this.controlWidth + " " + this.controlHeight + "'>" +
							"<defs>" +
								this.gradientElement + 
							"</defs>" +
							"<g class='container' transform='translate(" + px + "," + py + ")'>" +
								"<g fill='" + this.textcolor + "'>" +
									"<text style='font-family: \"" + this.font + "\"; font-size: " + this.fontsize + "px; font-weight: " + this.fontweight + "; letter-spacing: " + this.spacing + "px;' id='" + this.controlId + "text'>" + this.text + "</text>" +
								"</g>" +
								"<g  fill='url(#" + this.controlId + "gradientFill)'>" +
									"<text style='font-family: \"" + this.font + "\"; font-size: " + this.fontsize + "px; font-weight: " + this.fontweight + "; letter-spacing: " + this.spacing + "px;' id='" + this.controlId + "text'>" + this.text + "</text>" +
								"</g>" +
							"</g>" +
						"</svg>";

		this.svgContainer.innerHTML = svgstring;

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

enum Shape {
	Rectangle = "Rectangle",
	Circle = "Circle"
}

enum Gradient {
	Linear = "Linear",
	Radial = "Radial"
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