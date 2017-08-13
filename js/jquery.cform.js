/*!
 * jQuery cForms v1.0.0
 * http://cforms.jacksbox.de
 *
 * Author: Mario Jäckle
 * eMail: support@jacksbox.de
 *
 * Copyright 2015, jacksbox.design
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    $.cForm = function(element, options){
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$element = $(element);
        base.element = element;
        
        // Add a reverse reference to the DOM object
        base.$element.data("cForm", base);
        
        base.init = function(){
            base.options = $.extend({},$.cForm.defaultOptions, base.options);
           	base.options.templates = $.extend({},$.cForm.defaultOptions.templates, base.options.templates);

            // elements which will be styled
            var filter = ['input', 'textarea', 'select', 'button'];

            // initialize a array for radio groups 
        	base.radioGroupArray = [];

            // check if the called element a wrapper or a form-element
            // invoce the corresponding functions
            if(base.$element.is(filter.join())){
            	var tag = base.tagName(base.$element);

            	if(tag === 'input') 	base.handleInput(base.$element);
            	if(tag === 'select') 	base.handleSelect(base.$element);
            	if(tag === 'button') 	base.handleButton(base.$element);
            	if(tag === 'textarea') 	base.handleTextarea(base.$element);
            } else {        		
            	base.$element.find('input').each(function(){
            		base.handleInput($(this));
            	});
            	base.$element.find('select').each(function(){
            		base.handleSelect($(this));
            	});
            	base.$element.find('button').each(function(){
            		base.handleButton($(this));
            	});
            	base.$element.find('textarea').each(function(){
            		base.handleTextarea($(this));
            	});
            }
        };

		/**
		 * handles the BUTTON conversion
		 * 
		 * @param  {object} $node jQuery-Element // BUTTON
		 */
        base.handleButton = function($node) {
        	var template = base.options.templates['button'];
        	$node.wrap(template);
        };

		/**
		 * handles the TEXTAREA conversion
		 * 
		 * @param  {object} $node jQuery-Element // TEXTAREA
		 */
        base.handleTextarea = function($node) {
        	var template = base.options.templates['textarea'];
        	$node.wrap(template);
        };
        
		/**
		 * handles the INPUT conversion
		 * 
		 * @param  {object} $node jQuery-Element // INPUT
		 */
        base.handleInput = function($node){
        	var type = $node.attr('type'),
        		name = $node.attr('name'),
        		value = $node.attr('value'),
        		checked = $node.attr('checked'),
        		template = '',
        		$html = $();

        	// check for input type
            if (typeof type === typeof undefined && type === false) {
				console.log('Error: Missing type-Attribute on input!');
				return false;
			}
			if (typeof name === typeof undefined && name === false) {
				name = '';
			}
			if (typeof value === typeof undefined && value === false) {
				value = '';
			}
			if (typeof checked === typeof undefined && checked === false) {
				checked = '';
			}

			template = base.options.templates[type];

			switch(type) {
			    case 'password':
			    case 'text':
			    	$node.wrap(template);
			        break;
			    case 'file':
					$html = $(template.replace('{{name}}',name));
	
			    	// when the cForm file button gets clicked
			    	// trigger the original file button
					$html.bind('click', 
						{
							$node: $node
						},
						function (event) {
							var $node = event.data.$node;
								$node.trigger('click');
						}
					);

					// when the original file input gets changed (gets a file)
					// update the cForm file input as well
					$node.bind(
						'change', 
						{
							$html: $html
						},
						function (event) {
							var filename = $(this).val().split('\\').pop(),
								$html = event.data.$html;
						
							$html.addClass('filled')
								.find('.cform-filename')
									.text(filename);
						}
					);
			
					base.addToDom($node, $html);
			    	break;
			    case 'checkbox':
			    	$html = $(template.replace('{{name}}',name).replace('{{value}}',value));

			    	if(checked || checked === 'checked'){
			    		$html.addClass('checked')
			    			.data('checked', true);
			    	}

			    	// when the cForm checkbox gets clicked, change its style/values
			    	// change the original checkbox as well
			    	$html.bind(
			    		'click', 
			    		{
			    			$origin: $node
			    		},
			    		function(event){
			    			var $node = $(this),
			    				$origin = event.data.$origin,
			    				checked = $node.data('checked');
	
			    			if(checked){
			    				$origin.prop('checked', false);
			    				$node.removeClass('checked')
			    					.data('checked', false);
			    			}else{
			    				$origin.prop('checked', true);
			    				$node.addClass('checked')
			    					.data('checked', true);
			    			}
			    		}
			    	);

			    	// when the original checkbox gets changed via js or other means
			    	// update the cForm checkbox as well
			    	$node.bind(
			    		'change', 
			    		{
			    			$mirror: $html
			    		}, 
			    		function(event){
			    			var $node = $(this),
			    				$mirror = event.data.$mirror;
	
			    			if($node.prop('checked')){
			    				$mirror.addClass('checked')
			    					.data('checked', true);
			    			}else{
								$mirror.removeClass('checked')
			    					.data('checked', false);
			    			}
			    		}
			    	);
			
					base.addToDom($node, $html);
			        break;
			    case 'radio':
			    	// for each radio group (= same name) 
			    	// we want do this just once!
			    	if(base.radioGroupArray.indexOf(name) > -1){
			    		break;
			    	}
			    	base.radioGroupArray.push(name);
			    	var $mirrors = $();

			    	// get all radios with the same name and iterate
			    	// create html and insert, also hide the original
			    	$nodes = base.$element.find('input[type="radio"][name="' + name + '"]');
			    	$nodes.each(function(){
			    		var $node = $(this),
			    			value = $node.val(),
							checked = $node.attr('checked'),
							$html = $();

			    		$html = $(template.replace('{{name}}', name).replace('{{value}}', value));

						checked && $html.addClass('checked').data('checked', 'true');

						$mirrors = $mirrors.add($html);
						$node.addClass('cform-hidden').after($html);
			    	});

			    	// when a cForm radio gets clicked, change its style/values
			    	// change the original radio as well
					$mirrors.bind(
						'click', 
						{
							$mirrors: $mirrors, 
							$origins: $nodes
						}, 
						function(event){
							var $node = $(this),
								$mirrors = event.data.$mirrors,
								$origins = event.data.$origins,
								value = $node.data('value');
			
							if($node.data('checked')) return true;
			
							$mirrors.removeClass('checked')
								.data('checked', false);
							$node.addClass('checked')
								.data('checked', true);
							$origins.prop('checked', true)
								.filter('[value="' + value + '"]')
								.prop('checked', true);
						}
					);

			    	// when the original radio group gets changed via js or other means
			    	// update the cForm radio group as well
					$nodes.bind(
						'change', 
						{
							$mirrors: $mirrors, 
							$origins: $nodes
						}, 
						function(event){
							var $node = $(this),
								$mirrors = event.data.$mirrors,
								$origins = event.data.$origins,
								value = $node.val();

							if($node.data('checked')) return true;

							$mirrors.removeClass('checked')
								.data('checked', false)
								.filter('[data-value="' + value + '"]')
									.data('checked', true)
									.addClass('checked');
						}
					);
			
					base.addToDom($node, $html);
			        break;
			    case 'submit':
			    	$node.wrap(template);
			        break;
			    default:
					console.log('Error: No matching was found - You will be forever alone!');
			}
        };

       	/**
		 * handles the SELECT conversion
		 * 
		 * @param  {object} $node jQuery-Element // SELECT
		 */
        base.handleSelect = function($node){
        	var name = $node.attr('name'),
        		value = $node.attr('value'),
        		multiple = $node.attr('multiple'),
        		$subnodes = $node.find('option'),
        		$selected = $subnodes.filter(':selected'),
        		template = '',
        		$options = $(),
        		$html = $();

			if (typeof name === typeof undefined && name === false) {
				name = '';
			}			
			if (typeof value === typeof undefined && value === false) {
				value = '';
			}
			if (typeof multiple === typeof undefined || multiple === false) {
				multiple = false;
				template = base.options.templates['select'];
				$html = $(template.replace('{{name}}', name)
							.replace('{{text}}', $selected.html()));
			}else{
				multiple = true;
				template = base.options.templates['multiselect'];
				$html = $(template.replace('{{name}}', name));
			}

			// create and populate the option list
			$subnodes.each(function(index){
				var $node = $(this),
					cssclass = $node.prop('selected')?'selected':'',
					template = base.options.templates['option'];

				template = template.replace('{{value}}', $node.val())
								.replace('{{text}}', $node.html());

				$options = $options.add($(template).addClass(cssclass));
			});

			// when a cForm select-option gets clicked, change its style/values
			// change the original select/option as well
			$options.bind(
				'click', 
				{
					$origin: $node, 
					$mirror: $html, 
					$options: $options,
					multiple: multiple
				},
				function (event) {
					var $node = $(this),
						$origin = event.data.$origin,
						$mirror = event.data.$mirror,
						$options = event.data.$options,
						multiple = event.data.multiple,
						value = $node.data('value'),
						text = $node.html();
						
					if(!multiple){
						$options.not($node).removeClass('selected');
						$node.addClass('selected');
		
						$origin.val(value);
		
						$mirror.data('value', value)
							.find('.cform-control')
								.html(text);							
					}else{
						var value_array = [];
						if($node.hasClass('selected')){
							value_array = $origin.val();
							value_array.splice(value_array.indexOf(value), 1);

							$origin.val(value_array);
							$mirror.data('value', value_array);
							$node.removeClass('selected');
						}else{
							value_array = $origin.val()?$origin.val():[];
							value_array.push(value);

							$origin.val(value_array);
							$mirror.data('value', value_array);
							$node.addClass('selected');
						}
					}
				}
			);

			// when the original select gets changed via js or other means
			// update the cForm select/options as well
			$node.bind(
				'change', 
				{
					$origin: $node,
					$mirror: $html,  
					$options: $options,
					multiple: multiple
				}, 
				function(event){
					var $node = $(this),
						value = $node.val(),
						text = $node.find('option[value="' + value + '"]').html(),
						$origin = event.data.$origin,
						$mirror = event.data.$mirror,
						$options = event.data.$options,
						multiple = event.data.multiple;

					if(!multiple){
						$mirror.data('value', value)
							.find('.cform-control')
								.html(text);
		
						$options.removeClass('selected')
							.filter('[data-value="' + value + '"]')
							.addClass('selected');
					}else{
						var value_array = $origin.val()?$origin.val():[],
							i = 0;
						$mirror.data('value', value_array);

						$options.removeClass('selected');
						
						for(i = 0; i < value_array.length; i++){
							$options.filter('[data-value="' + value_array[i] + '"]')
								.addClass('selected')
						};
					}
				}
			)

			// adds the option-list-html to the cForm element
			$html.find('ul').append($options);

			base.addToDom($node, $html);
        };

        /**
         * adds an jQuery-Element to the DOM 
         * and hides the connected element
         * 
         * @param {object} $node jQuery-Element (original)
         * @param {object} $html Query-Element (cForm)
         */
        base.addToDom = function($node, $html) {
			$node.addClass('cform-hidden').after($html);
        };

        /* *** HELPER *** */

		/**
		 * return the tag name of an html-tag (in lower-case)
		 * 
		 * @param  {string} $element html-tag as string
		 * @return {string}          name of the html-tag
		 */
        base.tagName = function($element) {
  			return $element.prop("tagName").toLowerCase();
		};
        
        /* *** RUN THE PLUGIN *** */

        base.init();
    };
    
    $.cForm.defaultOptions = {
    	templates:		{	// html templates for the differnet form fields
    		text:      		'<div class="cform-text"></div>',
    		textarea:      	'<div class="cform-text"></div>',
    		password:   	'<div class="cform-text cform-password"></div>',
    		file:   		'<div class="cform-file" data-name="{{name}}">\
    							<div class="cform-control">选择</div>\
    							<div class="cform-filename">文件名</div>\
    						</div>',
    		checkbox:		'<div class="cform-checkbox" data-name="{{name}}" data-value="{{value}}">\
    							<div class="cform-marker"></div>\
    						</div>',
    		radio:			'<div class="cform-radio" data-name="{{name}}" data-value="{{value}}">\
    							<div class="cform-marker"></div>\
    						</div>',
    		select: 		'<div class="cform-select" data-name="{{name}}">\
    							<div class="cform-control">{{text}}</div>\
    							<ul></ul>\
    						</div>',
    		multiselect: '<div class="cform-multiselect" data-name="{{name}}">\
    							<ul></ul>\
    						</div>',
    		option: 		'<li data-value="{{value}}">{{text}}</li>',
    		button: 		'<div class="cform-button"></div>',
    		submit: 		'<div class="cform-submit"></div>',
    	}
    };
    
    $.fn.cForm = function(options){
        return this.each(function(){
            (new $.cForm(this, options));
        });
    };
    
})(jQuery);