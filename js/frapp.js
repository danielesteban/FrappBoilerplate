TEMPLATE = {
	example : function(params, render) {
		/* Pre-Render Example: Get some data */
		var data = {
				someData : FRAPP.storage.get('someData'),
				session : SESSION.data
			};

		/* Render the panel */
		render(data);

		/* Post-Render Example: Bind some event */
		$('#someData').submit(function(e) {
			e.preventDefault();
			FRAPP.storage.set('someData', e.target.someData.value);
		});

		/* Post-Render Example: Focus an input */
		$('#someData input').focus();
	}
};

window.addEventListener('frapp.init', function() {
	/* Render the Frapp */
	$('body').append(Handlebars.templates.frapp({
		version : FRAPP.version.frapp
	}));

	/* Router setup */
	ROUTER = new ROUTER(function(panel, params) {
		var render = function(data) {
				$('section').replaceWith(Handlebars.templates[panel](data));
			};

		panel = panel || 'home'; //The default panel
		if(TEMPLATE[panel]) return TEMPLATE[panel](params, render);
		render(params);
	});
});
