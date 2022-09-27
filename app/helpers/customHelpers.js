let register = function (Handlebars) {
	let helpers = {
		ifEquals: function (arg1, arg2, options) {
			return arg1 == arg2 ? options.fn(this) : options.inverse(this);
		},

		filter: function (arr, val, options) {
			if (arr !== undefined) {
				let str = [];
				arr.forEach((element) => {
					element.param == val ? (str += options.fn(element)) : options.inverse(this);
				});

				return str;
			}
		},

		ifContain: function (arr, val, pos, neg, options) {
			if (arr !== undefined) {
				let str = options.fn(pos);
				arr.forEach((element) => {
					if (element.param == val) {
						str = options.fn(neg);
					}
				});
				return str;
			}
		},
		toStringBase64: function (img, options) {
			return options.fn(img.data.toString("base64"));
		},

		section: function (name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},
	};

	if (Handlebars && typeof Handlebars.registerHelper === "function") {
		// register helpers
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		// just return helpers object if we can't register helpers here
		return helpers;
	}
};

module.exports.register = register;
module.exports.helpers = register(null);
