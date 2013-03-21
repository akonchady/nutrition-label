/*
 ******************************************************************************************************************+
 * NUTRITIONIX.com                                                                                                 |
 *                                                                                                                 |
 * This plugin allows you to create a fully customizable nutrition label                                           |
 *                                                                                                                 |
 * @authors			majin22 (js) and genesis23rd (css and html)                                                        |
 * @copyright			Copyright (c) 2012 Nutritionix.                                                                  |
 * @license			This Nutritionix jQuery Nutrition Label is dual licensed under the MIT and GPL licenses.           |
 * @link				http://www.nutritionix.com                                                                         |
 * @github			http://github.com/nutritionix/nutrition-label                                                      |
 * @version			2.0.4                                                                                              |
 *                                                                                                                 |
 ******************************************************************************************************************+
*/
;(function($){
	$.fn.nutritionLabel = function(option, settings){
		if (typeof option === 'object'){
			settings = option;
			init( settings, $(this) );
		}else if (typeof option === 'string' && option != ''){
			//destroys the nutrition label's html code
			if (option == 'destroy')
				new NutritionLabel().destroy( $(this) );
			//allows the user to hide the nutrition value
			else if (option == 'hide')
				new NutritionLabel().hide( $(this) );
			//allows the user to show the nutrition value
			else if (option == 'show')
				new NutritionLabel().show( $(this) );
			else{
				var values = [];

				var elements = this.each(function(){
					var data = $(this).data('_nutritionLabel');
					if (data){
						if ($.fn.nutritionLabel.defaultSettings[option] !== undefined){
							if (settings !== undefined){
								//set the option and create the nutrition label
								data.settings[option] = settings;
								init( data.settings, $(this) );
							}else
								//return the value of a setting - can only be used after the label is created / initiated
								values.push(data.settings[option]);
						}
					}else if ($.fn.nutritionLabel.defaultSettings[option] !== undefined)
						//set the option and create the nutrition label
						//this is a special case so the single value setting will still work even if the label hasn't been initiated yet
						if (settings !== undefined){
							$.fn.nutritionLabel.defaultSettings[option] = settings;
							init( null, $(this) );
						}
				});

				//return the value of a setting
				if (values.length === 1)
					return values[0];

				//return the setting values or the elements
				return values.length > 0 ? values : elements;
			}
		}else if (typeof option === 'undefined' || option == '')
			//if no value / option is supplied, simply create the label using the default values
			init( settings, $(this) );
	}


	$.fn.nutritionLabel.defaultSettings = {
		//default fixedWidth of the nutrition label
		width : 260,

		//to allow custom width - usually needed for mobile sites
		allowCustomWidth : false,
		widthCustom : 'auto',

		//to allow the label to have no border
		allowNoBorder : false,

		//to enable rounding of the numerical values based on the FDA rounding rules
		//http://goo.gl/RMD2O
		allowFDARounding : false,

		//the name of the item for this label (eg. cheese burger or mayonnaise)
		itemName : 'Item / Ingredient Name',
		//the brand name of the item for this label (eg. just salad)
		brandName : 'Brand where this item belongs to',
		//to scroll the ingredients if the innerheight is > scrollHeightComparison
		scrollLongIngredients : false,
		scrollHeightComparison : 100,
		//the height in px of the ingredients div
		scrollHeightPixel : 95,
		//this is to set how many decimal places will be shown on the nutrition values (calories, fat, protein, vitamin a, iron, etc)
		decimalPlacesForNutrition : 1,
		//this is to set how many decimal places will be shown for the "% daily values*"
		decimalPlacesForDailyValues : 0,

		//show the customizable link at the bottom
		showBottomLink : false,
		//url for the customizable link at the bottom
		urlBottomLink : 'http://www.nutritionix.com',
		//link name for the customizable link at the bottom
		nameBottomLink : 'Nutritionix',

		//default calorie intake
		calorieIntake : 2000,

		//these are the recommended daily intake values
		dailyValueTotalFat : 65,
		dailyValueSatFat : 20,
		dailyValueCholesterol : 300,
		dailyValueSodium : 2400,
		dailyValueCarb : 300,
		dailyValueFiber : 25,

		//these values can be change to hide some nutrition values
		showServingSize : true,
		showCalories : true,
		showFatCalories : true,
		showTotalFat : true,
		showSatFat : true,
		showTransFat : true,
		showPolyFat : true,
		showMonoFat : true,
		showCholesterol : true,
		showSodium : true,
		showTotalCarb : true,
		showFibers : true,
		showSugars : true,
		showProteins : true,
		showVitaminA : true,
		showVitaminC : true,
		showCalcium : true,
		showIron : true,

		//to show the 'amount per serving' text
		showAmountPerServing : true,
		//to show the 'servings per container' data and replace the default 'Serving Size' value (without unit and servings per container text and value)
		showServingsPerContainer : false,
		//to show the item name. there are special cases where the item name is replaced with 'servings per container' value
		showItemName : true,
		//to show the item name at the top of the page
		showItemNameAtTheTop : false,
		//show the brand where this item belongs to
		showBrandName : false,
		//to show the ingredients value or not
		showIngredients : true,
		//to show the calorie diet info at the bottom of the label
		showCalorieDiet : false,

		//the are to set some values as 'not applicable'. this means that the nutrition label will appear but the value will be a 'gray dash'
		naServingSize : false,
		naCalories : false,
		naFatCalories : false,
		naTotalFat : false,
		naSatFat : false,
		naTransFat : false,
		naPolyFat : false,
		naMonoFat : false,
		naCholesterol : false,
		naSodium : false,
		naTotalCarb : false,
		naFibers : false,
		naSugars : false,
		naProteins : false,
		naVitaminA : false,
		naVitaminC : false,
		naCalcium : false,
		naIron : false,

		//these are the default values for the nutrition info
		valueServingSize : 0,
		valueServingSizeUnit : '',
		valueServingPerContainer : 1,
		valueCalories : 0,
		valueFatCalories : 0,
		valueTotalFat : 0,
		valueSatFat : 0,
		valueTransFat : 0,
		valuePolyFat : 0,
		valueMonoFat : 0,
		valueCholesterol : 0,
		valueSodium : 0,
		valueTotalCarb : 0,
		valueFibers : 0,
		valueSugars : 0,
		valueProteins : 0,
		valueVitaminA : 0,
		valueVitaminC : 0,
		valueCalcium : 0,
		valueIron : 0,

		//customizable units for the values
		unitCalories : '',
		unitFatCalories : '',
		unitTotalFat : 'g',
		unitSatFat : 'g',
		unitTransFat : 'g',
		unitPolyFat : 'g',
		unitMonoFat : 'g',
		unitCholesterol : 'mg',
		unitSodium : 'mg',
		unitTotalCarb : 'g',
		unitFibers : 'g',
		unitSugars : 'g',
		unitProteins : 'g',
		unitVitaminA : '%',
		unitVitaminC : '%',
		unitCalcium : '%',
		unitIron : '%',

		//these are the values for the optional calorie diet
		valueCol1CalorieDiet : 2000,
		valueCol2CalorieDiet : 2500,
		valueCol1DietaryTotalFat : 0,
		valueCol2DietaryTotalFat : 0,
		valueCol1DietarySatFat : 0,
		valueCol2DietarySatFat : 0,
		valueCol1DietaryCholesterol : 0,
		valueCol2DietaryCholesterol : 0,
		valueCol1DietarySodium : 0,
		valueCol2DietarySodium : 0,
		valueCol1DietaryTotalCarb : 0,
		valueCol2DietaryTotalCarb : 0,
		valueCol1Dietary : 0,
		valueCol2Dietary : 0,


		//these text settings is so you can create nutrition labels in different languages or to simply change them to your need
		textNutritionFacts : 'Nutrition Facts',
		textDailyValues : 'Daily Value',
		textServingSize : 'Serving Size',
		textServingsPerContainer : 'Servings Per Container',
		textAmountPerServing : 'Amount Per Serving',
		textCalories : 'Calories',
		textFatCalories : 'Calories from Fat',
		textTotalFat : 'Total Fat',
		textSatFat : 'Saturated Fat',
		textTransFat : '<i>Trans</i> Fat',
		textPolyFat : 'Polyunsaturated Fat',
		textMonoFat : 'Monounsaturated Fat',
		textCholesterol : 'Cholesterol',
		textSodium : 'Sodium',
		textTotalCarb : 'Total Carbohydrates',
		textFibers : 'Dietary Fiber',
		textSugars : 'Sugars',
		textProteins : 'Protein',
		textVitaminA : 'Vitamin A',
		textVitaminC : 'Vitamin C',
		textCalcium : 'Calcium',
		textIron : 'Iron',
		ingredientLabel : 'INGREDIENTS:',
		ingredientList : 'None',
		textPercentDailyPart1 : 'Percent Daily Values are based on a',
		textPercentDailyPart2 : 'calorie diet'
	};


	// this will store the unique individual properties for each instance of the plugin
	function NutritionLabel(settings, $elem){
		this.nutritionLabel = null;
		this.settings = settings;
		this.$elem = $elem;

		return this;
	}


	function init(settings, $elem){
		//initalize the nutrition label and create / recreate it
		var $settings = $.extend( {}, $.fn.nutritionLabel.defaultSettings, settings || {} );

		var nutritionLabel = new NutritionLabel($settings, $elem);
		$elem.html( nutritionLabel.generate() );

		//scroll the ingredients of the innerheight is > $settings.scrollHeightComparison
			//and the settings showIngredients and scrollLongIngredients are true
		if ($settings.showIngredients && $settings.scrollLongIngredients){
			if ($elem.attr('id') != undefined && $elem.attr('id') != '')
				//this code is for pages with multiple nutrition labels generated by the plugin like the demo page
				$ingredientListParent = $('#'+$elem.attr('id')+' #ingredientList').parent();
			else
				$ingredientListParent = $('#ingredientList').parent();
			if ($ingredientListParent.innerHeight() > $settings.scrollHeightComparison)
				$ingredientListParent.css({
					'height' : $settings.scrollHeightPixel+'px',
					'width' : '100%',
					'overflow-y' : 'scroll'
				});
		}

		//this code is for pages with multiple nutrition labels generated by the plugin like the demo page
		if ($elem.attr('id') != undefined && $elem.attr('id') != '')
			$('#'+$elem.attr('id')+' .notApplicable').hover(
				function(){
					$('#'+$elem.attr('id')+' .naTooltip')
						.css({
							'top' : $(this).position().top+'px',
							'left' : $(this).position().left+'px'
						})
						.show();
				},
				function(){
					$('#'+$elem.attr('id')+' .naTooltip').hide();
				}
			)
		else
			$('#'+$elem.attr('id')+' .notApplicable').hover(
				function(){
					$('.naTooltip')
						.css({
							'top' : $(this).position().top+'px',
							'left' : $(this).position().left+'px'
						})
						.show();
				},
				function(){
					$('.naTooltip').hide();
				}
			)


		// store the object for later reference
		$elem.data('_nutritionLabel', nutritionLabel);
	}


	function roundToNearestNum(input, nearest){
		if (nearest < 0)
			return Math.round(input*nearest)/nearest;
		else
			return Math.round(input/nearest)*nearest;
	}


	function roundCalories(toRound, decimalPlace){
		toRound = roundCaloriesRule(toRound);
		if (toRound > 0)
			toRound = toRound.toFixed(decimalPlace);
		return toRound;
	}


	function roundFat(toRound, decimalPlace){
		toRound = roundFatRule(toRound);
		if (toRound > 0)
			toRound = toRound.toFixed(decimalPlace);
		return toRound;
	}


	function roundSodium(toRound, decimalPlace){
		toRound = roundSodiumRule(toRound);
		if (toRound > 0)
			toRound = toRound.toFixed(decimalPlace);
		return toRound;
	}


	function roundCholesterol(toRound, decimalPlace){
		var normalVersion = true;
		var roundResult = roundCholesterolRule(toRound);
		if (roundResult === false)
			normalVersion = false;
		else
			toRound = roundResult;
		if (normalVersion){
			if (toRound > 0)
				toRound = toRound.toFixed(decimalPlace);
		}else
			toRound = '< 5';
		return toRound;
	}


	function roundCarbFiberSugarProtein(toRound, decimalPlace){
		var normalVersion = true;
		var roundResult = roundCarbFiberSugarProteinRule(toRound);
		if (roundResult === false)
			normalVersion = false;
		else
			toRound = roundResult;
		if (normalVersion){
			if (toRound > 0)
				toRound = toRound.toFixed(decimalPlace);
		}else
			toRound = '< 1';
		return toRound;
	}


	//Calories and Calories from Fat rounding rule
	function roundCaloriesRule(toRound){
		if (toRound < 5)
			return 0;
		else if (toRound <= 50)
			//50 cal - express to nearest 5 cal increment
			return roundToNearestNum(toRound, 5);
		else
			//> 50 cal - express to nearest 10 cal increment
			return roundToNearestNum(toRound, 10);
	}


	//Total Fat, Saturated Fat, Polyunsaturated Fat and Monounsaturated Fat rounding rule
	function roundFatRule(toRound){
		if (toRound < .5)
			return 0;
		else if (toRound < 5)
			//< 5 g - express to nearest .5g increment
			return roundToNearestNum(toRound, .5);
		else
			//>= 5 g - express to nearest 1 g increment
			return roundToNearestNum(toRound, 1);
	}


	//Sodium rounding rule
	function roundSodiumRule(toRound){
		if (toRound < 5)
			return 0;
		else if (toRound <= 140)
			//5 - 140 mg - express to nearest 5 mg increment
			return roundToNearestNum(toRound, 5);
		else
			//>= 5 g - express to nearest 1 g increment
			return roundToNearestNum(toRound, 10);
	}


	//Cholesterol rounding rule
	function roundCholesterolRule(toRound){
		if (toRound < 2)
			return 0;
		else if (toRound <= 5)
			return false;
		else
			//> 5 mg - express to nearest 5 mg increment
			return roundToNearestNum(toRound, 5);
	}


	//Total Carbohydrate, Dietary Fiber, Sugar and Protein rounding rule
	function roundCarbFiberSugarProteinRule(toRound){
		if (toRound < .5)
			return 0;
		else if (toRound <= 1)
			//< 1 g - express as "Contains less than 1g" or "less than 1g"
			return false;
		else
			//> 1 mg - express to nearest 1 g increment
			return roundToNearestNum(toRound, 1);
	}


	NutritionLabel.prototype = {
		generate: function(){
			//this is the function that returns the html code for the nutrition label based on the settings that is supplied by the user
			var $this = this;

			// return the plugin incase it has already been created
			if ($this.nutritionLabel)
				return $this.nutritionLabel;

			//initializing the tab variables
			//tab variables are used to make the printing of the html code readable when you copy the code using
				//firebug => inspect => copy innerhtml
			//for debugging and editing purposes
			for (x = 1; x < 9; x++){
				var tab = '';
				for (y = 1; y <= x; y++)
					tab += '\t';
				eval('var tab' + x + ' = "' + tab + '";');
			}

			//initialize the not applicable image icon in case we need to use it
			var naValue = '<font class="notApplicable">-&nbsp;</font>';

			var calorieIntakeMod = (parseFloat($this.settings.calorieIntake) / 2000).toFixed(2);

			var borderCSS = '';
			if ($this.settings.allowNoBorder)
				borderCSS = 'border: 0;';

			//this is a straighforward code - creates the html code for the label based on the settings
		if (!$this.settings.allowCustomWidth)
			var nutritionLabel = '<div class="nutritionLabel" style="' + borderCSS + ' width: '+ $this.settings.width + 'px;">\n';
		else
			var nutritionLabel = '<div class="nutritionLabel" style="' + borderCSS + ' width: '+ $this.settings.widthCustom + ';">\n';

			if ($this.settings.showItemName && $this.settings.showItemNameAtTheTop)
				nutritionLabel += tab1 + '<div class="name">' + $this.settings.itemName + '</div>\n';

			if ($this.settings.showBrandName)
				nutritionLabel += tab1 + '<div class="brandname">' + $this.settings.brandName + '</div>\n';

				nutritionLabel += tab1 + '<div class="title">' + $this.settings.textNutritionFacts + '</div>\n';

			if ($this.settings.showServingSize){
				//hideServings is a special variable on the save meal pages
				nutritionLabel += tab1 + '<div class="serving">\n';

				if (!$this.settings.showServingsPerContainer){
					nutritionLabel += tab2 + '<div>' + $this.settings.textServingSize + ' ';
						nutritionLabel += ($this.settings.naServingSize ? naValue : $this.settings.valueServingSize.toFixed($this.settings.decimalPlacesForNutrition) );
					nutritionLabel += '</div>\n';
				}else{
					// Serving size
					nutritionLabel += tab2 + '<div>' + $this.settings.textServingSize + ' ';
						nutritionLabel += ($this.settings.naServingSize ? naValue : $this.settings.valueServingSize.toFixed($this.settings.decimalPlacesForNutrition) ) + ' '+ $this.settings.valueServingSizeUnit;
					nutritionLabel += '</div>\n';

					// Serving per container
					nutritionLabel += tab2 + '<div>' + $this.settings.textServingsPerContainer + ' ';
						nutritionLabel += $this.settings.valueServingPerContainer.toFixed($this.settings.decimalPlacesForNutrition);
					nutritionLabel += '</div>\n';
				}

				nutritionLabel += tab1 + '</div>\n';
			}


			if ($this.settings.showItemName && !$this.settings.showItemNameAtTheTop)
				nutritionLabel += tab1 + '<div class="name">' + $this.settings.itemName + '</div>\n';

				nutritionLabel += tab1 + '<div class="bar1"></div>\n';


			if ($this.settings.showAmountPerServing){
				nutritionLabel += tab1 + '<div class="line m">';
					nutritionLabel += '<b>' + $this.settings.textAmountPerServing + '</b>';
				nutritionLabel += '</div>\n';
			}

				nutritionLabel += tab1 + '<div class="line">\n';

				if ($this.settings.showFatCalories){
					nutritionLabel += tab2 + '<div class="fr">';
						nutritionLabel += $this.settings.textFatCalories + ' ';
						nutritionLabel += (
							$this.settings.naFatCalories ?
								naValue :
								(
								jQuery.type($this.settings.valueFatCalories) == 'string' ?
									$this.settings.valueFatCalories :
									(
									$this.settings.allowFDARounding ?
										roundCalories($this.settings.valueFatCalories, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueFatCalories.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitFatCalories
								)
							);
					nutritionLabel += '</div>\n';
				}


				if ($this.settings.showCalories){
					nutritionLabel += tab2 + '<div>';
						nutritionLabel += '<b>' + $this.settings.textCalories + '</b> ';
						nutritionLabel += (
							$this.settings.naCalories ?
								naValue :
								(
								jQuery.type($this.settings.valueCalories) == 'string' ?
									$this.settings.valueCalories :
									(
									$this.settings.allowFDARounding ?
										roundCalories($this.settings.valueCalories, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueCalories.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitCalories
								)
							);
					nutritionLabel += '</div>\n';
				}


				nutritionLabel += tab1 + '</div>\n';
				nutritionLabel += tab1 + '<div class="bar2"></div>\n';

				nutritionLabel += tab1 + '<div class="line ar">';
					nutritionLabel += '<b>% ' + $this.settings.textDailyValues + '<sup>*</sup></b>';
				nutritionLabel += '</div>\n';

			if ($this.settings.showTotalFat){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naTotalFat ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueTotalFat) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundFatRule($this.settings.valueTotalFat) : $this.settings.valueTotalFat) / ($this.settings.dailyValueTotalFat * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + '<b>' + $this.settings.textTotalFat + '</b> ';
						nutritionLabel +=
							(
							$this.settings.naTotalFat ?
								naValue :
								(
								jQuery.type($this.settings.valueTotalFat) == 'string' ?
									$this.settings.valueTotalFat :
									(
									$this.settings.allowFDARounding ?
										roundFat($this.settings.valueTotalFat, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueTotalFat.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitTotalFat
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showSatFat){
				nutritionLabel += tab1 + '<div class="line indent">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naSatFat ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueSatFat) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundFatRule($this.settings.valueSatFat) : $this.settings.valueSatFat) / ($this.settings.dailyValueSatFat * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textSatFat + ' ';
						nutritionLabel +=
							(
							$this.settings.naSatFat ?
								naValue :
								(
								jQuery.type($this.settings.valueSatFat) == 'string' ?
									$this.settings.valueSatFat :
									(
									$this.settings.allowFDARounding ?
										roundFat($this.settings.valueSatFat, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueSatFat.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitSatFat
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showTransFat){
				nutritionLabel += tab1 + '<div class="line indent">\n';
					nutritionLabel += tab2 + $this.settings.textTransFat + ' ';
						nutritionLabel +=
							(
							$this.settings.naTransFat ?
								naValue :
								(
								jQuery.type($this.settings.valueTransFat) == 'string' ?
									$this.settings.valueTransFat :
									(
									$this.settings.allowFDARounding ?
										roundFat($this.settings.valueTransFat, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueTransFat.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitTransFat
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showPolyFat){
				nutritionLabel += tab1 + '<div class="line indent">';
					nutritionLabel += $this.settings.textPolyFat + ' ';
						nutritionLabel +=
							(
							$this.settings.naPolyFat ?
								naValue :
								(
								jQuery.type($this.settings.valuePolyFat) == 'string' ?
									$this.settings.valuePolyFat :
									(
									$this.settings.allowFDARounding ?
										roundFat($this.settings.valuePolyFat, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valuePolyFat.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitPolyFat
								)
							);
				nutritionLabel += '</div>\n';
			}

			if ($this.settings.showMonoFat){
				nutritionLabel += tab1 + '<div class="line indent">';
					nutritionLabel += $this.settings.textMonoFat + ' ';
						nutritionLabel +=
							(
							$this.settings.naMonoFat ?
								naValue :
								(
								jQuery.type($this.settings.valueMonoFat) == 'string' ?
									$this.settings.valueMonoFat :
									(
									$this.settings.allowFDARounding ?
										roundFat($this.settings.valueMonoFat, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueMonoFat.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitMonoFat
								)
							);
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showCholesterol){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naCholesterol ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueCholesterol) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundCholesterolRule($this.settings.valueCholesterol) : $this.settings.valueCholesterol) / ($this.settings.dailyValueCholesterol * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + '<b>' + $this.settings.textCholesterol + '</b> ';
						nutritionLabel +=
							(
							$this.settings.naCholesterol ?
								naValue :
								(
								jQuery.type($this.settings.valueCholesterol) == 'string' ?
									$this.settings.valueCholesterol :
									(
									$this.settings.allowFDARounding ?
										roundCholesterol($this.settings.valueCholesterol, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueCholesterol.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitCholesterol
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showSodium){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naSodium ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueSodium) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundSodiumRule($this.settings.valueSodium) : $this.settings.valueSodium) / ($this.settings.dailyValueSodium * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + '<b>' + $this.settings.textSodium + '</b> ';
						nutritionLabel +=
							(
							$this.settings.naSodium ?
								naValue :
								(
								jQuery.type($this.settings.valueSodium) == 'string' ?
									$this.settings.valueSodium :
									(
									$this.settings.allowFDARounding ?
										roundSodium($this.settings.valueSodium, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueSodium.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitSodium
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showTotalCarb){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naTotalCarb ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueTotalCarb) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundCarbFiberSugarProteinRule($this.settings.valueTotalCarb) : $this.settings.valueTotalCarb) / ($this.settings.dailyValueCarb * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + '<b>' + $this.settings.textTotalCarb + '</b> ';
						nutritionLabel +=
							(
							$this.settings.naTotalCarb ?
								naValue :
								(
								jQuery.type($this.settings.valueTotalCarb) == 'string' ?
									$this.settings.valueTotalCarb :
									(
									$this.settings.allowFDARounding ?
										roundCarbFiberSugarProtein($this.settings.valueTotalCarb, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueTotalCarb.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitTotalCarb
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showFibers){
				nutritionLabel += tab1 + '<div class="line indent">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel += $this.settings.naFibers ?
							naValue :
							'<b>' + (
								jQuery.type($this.settings.valueFibers) == 'string' ?
								0 : parseFloat(
									(
										($this.settings.allowFDARounding ? roundCarbFiberSugarProteinRule($this.settings.valueFibers) : $this.settings.valueFibers) / ($this.settings.dailyValueFiber * calorieIntakeMod)
									) * 100
								).toFixed($this.settings.decimalPlacesForDailyValues)
							) + '</b>%';
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textFibers + ' ';
						nutritionLabel +=
							(	$this.settings.naFibers ?
								naValue :
								(
								jQuery.type($this.settings.valueFibers) == 'string' ?
									$this.settings.valueFibers :
									(
									$this.settings.allowFDARounding ?
										roundCarbFiberSugarProtein($this.settings.valueFibers, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueFibers.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitFibers
								)
							) + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showSugars){
				nutritionLabel += tab1 + '<div class="line indent">';
					nutritionLabel += $this.settings.textSugars + ' ';
						nutritionLabel +=
							(
							$this.settings.naSugars ?
								naValue :
								(
								jQuery.type($this.settings.valueSugars) == 'string' ?
									$this.settings.valueSugars :
									(
									$this.settings.allowFDARounding ?
										roundCarbFiberSugarProtein($this.settings.valueSugars, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueSugars.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitSugars
								)
							);
				nutritionLabel += '</div>\n';
			}

			if ($this.settings.showProteins){
				nutritionLabel += tab1 + '<div class="line">';
					nutritionLabel += '<b>' + $this.settings.textProteins + '</b> ';
						nutritionLabel +=
							(
							$this.settings.naProteins ?
								naValue :
								(
								jQuery.type($this.settings.valueProteins) == 'string' ?
									$this.settings.valueProteins :
									(
									$this.settings.allowFDARounding ?
										roundCarbFiberSugarProtein($this.settings.valueProteins, $this.settings.decimalPlacesForNutrition) :
										$this.settings.valueProteins.toFixed($this.settings.decimalPlacesForNutrition)
									) + $this.settings.unitProteins
								)
							);
				nutritionLabel += '</div>\n';
			}

			nutritionLabel += tab1 + '<div class="bar1"></div>\n';

			if ($this.settings.showVitaminA){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel +=
							(
							$this.settings.naVitaminA ?
								naValue :
								(
								jQuery.type($this.settings.valueVitaminA) == 'string' ?
									$this.settings.valueVitaminA :
									$this.settings.valueVitaminA.toFixed($this.settings.decimalPlacesForNutrition) + $this.settings.unitVitaminA
								)
							);
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textVitaminA + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showVitaminC){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel +=
							(
							$this.settings.naVitaminC ?
								naValue :
								(
								jQuery.type($this.settings.valueVitaminC) == 'string' ?
									$this.settings.valueVitaminC :
									$this.settings.valueVitaminC.toFixed($this.settings.decimalPlacesForNutrition) + $this.settings.unitVitaminC
								)
							);
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textVitaminC + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showCalcium){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel +=
							(
							$this.settings.naCalcium ?
								naValue :
								(
								jQuery.type($this.settings.valueCalcium) == 'string' ?
									$this.settings.valueCalcium :
									$this.settings.valueCalcium.toFixed($this.settings.decimalPlacesForNutrition) + $this.settings.unitCalcium
								)
							);
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textCalcium + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

			if ($this.settings.showIron){
				nutritionLabel += tab1 + '<div class="line">\n';
					nutritionLabel += tab2 + '<div class="dv">';
						nutritionLabel +=
							(
							$this.settings.naIron ?
								naValue :
								(
								jQuery.type($this.settings.valueIron) == 'string' ?
									$this.settings.valueIron :
									$this.settings.valueIron.toFixed($this.settings.decimalPlacesForNutrition) + $this.settings.unitIron
								)
							);
					nutritionLabel += '</div>\n';

					nutritionLabel += tab2 + $this.settings.textIron + '\n';
				nutritionLabel += tab1 + '</div>\n';
			}

				nutritionLabel += tab1 + '<div class="dvCalorieDiet line">\n';
					nutritionLabel += tab2 + '<div class="calorieNote">\n';
						nutritionLabel += tab3 + '<span class="star">*</span> ' + $this.settings.textPercentDailyPart1 + ' ' + $this.settings.calorieIntake + ' ' + $this.settings.textPercentDailyPart2 + '.\n';
					if ($this.settings.showIngredients){
						nutritionLabel += tab3 + '<br />\n';
						nutritionLabel += tab3 + '<div>\n';
							nutritionLabel += tab4 + '<b class="active" id="ingredientList">' + $this.settings.ingredientLabel + '</b>\n';
							nutritionLabel += tab4 + $this.settings.ingredientList + '\n';
						nutritionLabel += tab3 + '</div>\n';
					}
					nutritionLabel += tab2 + '</div>\n';

				if ($this.settings.showCalorieDiet){
			  		nutritionLabel += tab2 + '<table class="tblCalorieDiet">\n';
			          nutritionLabel += tab3 + '<thead>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<th>&nbsp;</th>\n';
			              nutritionLabel += tab5 + '<th>Calories</th>\n';
			              nutritionLabel += tab5 + '<th>'+$this.settings.valueCol1CalorieDiet+'</th>\n';
			              nutritionLabel += tab5 + '<th>'+$this.settings.valueCol2CalorieDiet+'</th>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			          nutritionLabel += tab3 + '</thead>\n';
			          nutritionLabel += tab3 + '<tbody>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>Total Fat</td>\n';
			              nutritionLabel += tab5 + '<td>Less than</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1DietaryTotalFat+'g</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2DietaryTotalFat+'g</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>&nbsp;&nbsp; Saturated Fat</td>\n';
			              nutritionLabel += tab5 + '<td>Less than</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1DietarySatFat+'g</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2DietarySatFat+'g</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>Cholesterol</td>\n';
			              nutritionLabel += tab5 + '<td>Less than</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1DietaryCholesterol+'mg</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2DietaryCholesterol+'mg</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>Sodium</td>\n';
			              nutritionLabel += tab5 + '<td>Less than</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1DietarySodium+'mg</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2DietarySodium+'mg</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>Total Carbohydrate</td>\n';
			              nutritionLabel += tab5 + '<td>&nbsp;</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1DietaryTotalCarb+'g</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2DietaryTotalCarb+'g</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			            nutritionLabel += tab4 + '<tr>\n';
			              nutritionLabel += tab5 + '<td>&nbsp;&nbsp; Dietary</td>\n';
			              nutritionLabel += tab5 + '<td>&nbsp;</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol1Dietary+'g</td>\n';
			              nutritionLabel += tab5 + '<td>'+$this.settings.valueCol2Dietary+'g</td>\n';
			            nutritionLabel += tab4 + '</tr>\n';
			          nutritionLabel += tab3 + '</tbody>\n';
			        nutritionLabel += tab2 + '</table>\n';
			  	}
				nutritionLabel += tab1 + '</div>\n';

			if ($this.settings.showBottomLink){
				nutritionLabel += tab1 + '<div class="spaceAbove"></div>\n';
				nutritionLabel += tab1 + '<a href="' + $this.settings.urlBottomLink + '" target="_newSite" class="homeLinkPrint">' + $this.settings.nameBottomLink + '</a>\n';
				nutritionLabel += tab1 + '<div class="spaceBelow"></div>\n';
			}

			nutritionLabel += '</div>\n';

			nutritionLabel += '<div class="naTooltip">Data not available</div>\n';

			//returns the html for the nutrition label
			return nutritionLabel;
		},


		destroy: function($this){
			$this.html('');
		},
		hide: function($this){
			$this.hide();
		},
		show: function($this){
			$this.show();
		}

	}
})(jQuery);