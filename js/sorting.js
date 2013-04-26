/* SORTING */ 

$(function(){
  var $container = $('.portfolio_block');

  $container.isotope({
	itemSelector : '.element'
  });
    
  var $optionSets = $('#options .optionset'),
	  $optionLinks = $optionSets.find('a');

  $optionLinks.click(function(){
	var $this = $(this);
	// don't proceed if already selected
	if ( $this.parent('li').hasClass('selected') ) {
	  return false;
	}
	var $optionSet = $this.parents('.optionset');
	$optionSet.find('.selected').removeClass('selected');
	$optionSet.find('.fltr_before').removeClass('fltr_before');
	$optionSet.find('.fltr_after').removeClass('fltr_after');
	$this.parent('li').addClass('selected');
	$this.parent('li').next('li').addClass('fltr_after');
	$this.parent('li').prev('li').addClass('fltr_before');

	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
	  // changes in layout modes need extra logic
	  changeLayoutMode( $this, options )
	} else {
	  // otherwise, apply new options
	  $container.isotope(options);	  
	}	
	return false;	
  });
	$('.masonry').find('img').load(function(){
		$container.isotope('reLayout');
	}); 	
});

jQuery.fn.portfolio_addon = function(addon_options) {
	//Set Variables
	var addon_el = $(this),
		addon_base = this,
		img_count = addon_options.items.length,
		img_per_load = addon_options.load_count,
		$newEls = '',
		loaded_object = '',
		$container = $('.image-grid');
	
	$('.btn_load_more').click(function(){
		$newEls = '';
		loaded_object = '';									   
		loaded_images = $container.find('.added').size();
		if ((img_count - loaded_images) > img_per_load) {
			now_load = img_per_load;
		} else {
			now_load = img_count - loaded_images;
		}
		
		if ((loaded_images + now_load) == img_count) $(this).fadeOut();

		if (loaded_images < 1) {
			i_start = 1;
		} else {
			i_start = loaded_images+1;
		}

		if (now_load > 0) {
			if (addon_options.type == 0) {
				//1 Column Portfolio Type
				for (i = i_start-1; i < i_start+now_load-1; i++) {
					loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +'" class="'+ addon_options.items[i].category +' element row-fluid added"><div class="filter_img span6"><a href="'+ addon_options.items[i].url +'"><img src="'+ addon_options.items[i].src +'" alt="" width="570" height="284"></a></div><div class="portfolio_dscr span6"><div class="portfolio_preview_head"><span class="post_type post_type_'+ addon_options.items[i].post_type +'"></span><a href="'+ addon_options.items[i].url +'"><h5>'+ addon_options.items[i].title +'</h5></a><div class="portfolio_descr_info"><div class="portfolio_descr_date">'+ addon_options.items[i].date +'</div><div class="portfolio_descr_url">Project URL: <a href="'+ addon_options.items[i].url +'">View Project</a></div><div class="portfolio_descr_time">Time spent: <span>'+ addon_options.items[i].time_spent +'</span></div></div><div class="portfolio_descr_in">In <a href="#">'+ addon_options.items[i].category +'</a></div></div>'+ addon_options.items[i].description +'<a href="'+ addon_options.items[i].url +'" class="more-link">Read more...</a></div></div>';
				}
			} else if (addon_options.type == 1) {
				//2 Columns Portfolio Type
				for (i = i_start-1; i < i_start+now_load-1; i++) {
					loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +'" class="'+ addon_options.items[i].category +' element added"><div class="filter_img"><img src="'+ addon_options.items[i].src +'" alt="" width="570" height="284"><div class="portfolio_info_wrapper"><span class="post_type post_type_'+ addon_options.items[i].post_type +'"></span><h5><a href="'+ addon_options.items[i].url +'">'+ addon_options.items[i].title +'</a></h5><div class="portfolio_descr_info"><div class="portfolio_descr_date">'+ addon_options.items[i].date +'</div><div class="portfolio_descr_url">Project URL: <a href="'+ addon_options.items[i].url +'">View Project</a></div><div class="portfolio_descr_time">Time spent: <span>'+ addon_options.items[i].time_spent +'</span></div></div><div class="portfolio_descr_in">In <a href="#">'+ addon_options.items[i].category +'</a></div></div><div class="portfolio_dscr">'+ addon_options.items[i].description +' <a href="'+ addon_options.items[i].url +'">Read more...</a></div></div></div>';
				}
			} else {
				//3 and 4 Columns Portfolio Type
				for (i = i_start-1; i < i_start+now_load-1; i++) {
					loaded_object = loaded_object + '<div data-category="'+ addon_options.items[i].category +'" class="'+ addon_options.items[i].category +' element added"><div class="filter_img"><img src="'+ addon_options.items[i].src +'" alt="" width="370" height="224"><div class="portfolio_info_wrapper"><h5><a href="'+ addon_options.items[i].url +'">'+ addon_options.items[i].title +'</a></h5></div><div class="portfolio_dscr"><span class="post_type post_type_'+ addon_options.items[i].post_type +'"></span><p>'+ addon_options.items[i].description +'</p><a href="'+ addon_options.items[i].url +'">Read more...</a></div></div></div>';
				}
			}

			$newEls = $(loaded_object);
			$container.isotope('insert', $newEls, function() {
				$container.isotope('reLayout');
			});
		}
	});
}
