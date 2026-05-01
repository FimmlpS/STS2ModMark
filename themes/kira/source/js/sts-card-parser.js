(function() {
	'use strict';

	function parseSTSCards() {
		const stscards = document.querySelectorAll('sts-card');
		
		stscards.forEach(cardElement => {
			const rawText = cardElement.textContent || '';
			const lines = rawText.split('\n').map(line => line.trim()).filter(line => line !== '');

			const attrs = {
				name: '',
				cost: '0',
				type: '攻击',
				description: '',
				'u-name': '',
				'u-cost': '',
				'u-type': '',
				'u-description': ''
			};

			lines.forEach(line => {
				if (line.startsWith('[') && line.endsWith(']')) {
					const lineContent = line.slice(1, -1);
					const equalsIndex = lineContent.indexOf('=');
					if (equalsIndex > 0) {
						const key = lineContent.slice(0, equalsIndex).trim().toLowerCase();
						const value = lineContent.slice(equalsIndex + 1).trim();
						if (Object.prototype.hasOwnProperty.call(attrs, key)) {
							attrs[key] = value;
						}
					}
				}
			});

			attrs.description = processDescription(attrs.description);
			attrs['u-description'] = processDescription(attrs['u-description']);

			const hasUpgrade = attrs['u-name'] || attrs['u-cost'] || attrs['u-type'] || attrs['u-description'];

			let cardHTML = '';

			if (hasUpgrade) {
				
				cardHTML += '<div class="sts-card-container">';
				cardHTML += '<div class="sts-card-compare">';

				
				cardHTML += buildCardHTML({
					name: attrs.name,
					cost: attrs.cost,
					type: attrs.type,
					description: attrs.description,
					upgraded: false
				});

				cardHTML += '<div class="sts-upgrade-arrow"></div>';

				const upgradedAttrs = {
					name: attrs['u-name'] || attrs.name,
					cost: attrs['u-cost'] || attrs.cost,
					type: attrs['u-type'] || attrs.type,
					description: attrs['u-description'] || attrs.description,
					upgraded: true
				};

				if (!upgradedAttrs.name.endsWith('+')) {
					upgradedAttrs.name = upgradedAttrs.name + '+';
				}

				cardHTML += buildCardHTML(upgradedAttrs);

				cardHTML += '</div>';
				cardHTML += '</div>';

			} else {
				
				cardHTML += '<div class="sts-card-container">';
				cardHTML += buildCardHTML({
					name: attrs.name,
					cost: attrs.cost,
					type: attrs.type,
					description: attrs.description,
					upgraded: false
				});
				cardHTML += '</div>';
			}

			cardElement.innerHTML = cardHTML;
		});
	}

	function buildCardHTML(config) {
		const typeClass = getTypeClass(config.type);
		const costClass = getCostClass(config.cost);
		const upgradeClass = config.upgraded ? ' sts-upgraded' : '';
		const displayCost = config.cost.toLowerCase() === 'x' ? 'X' : config.cost;

		let html = '';
		html += '<div class="sts-card ' + typeClass + upgradeClass + '">';
		html += '<div class="sts-card-cost ' + costClass + '">' + displayCost + '</div>';
		html += '<div class="sts-card-header">';
		html += '<div class="sts-card-name">' + config.name + '</div>';
		html += '</div>';
		html += '<div class="sts-card-type">' + config.type + '</div>';
		html += '<div class="sts-card-divider"></div>';
		html += '<div class="sts-card-description">' + config.description + '</div>';
		html += '</div>';

		return html;
	}

	function getTypeClass(type) {
		const typeLower = type.toLowerCase();
		switch (typeLower) {
			case '攻击':
				return 'sts-attack';
			case '技能':
				return 'sts-skill';
			case '能力':
				return 'sts-power';
			case '诅咒':
				return 'sts-curse';
			default:
				return '';
		}
	}

	function getCostClass(cost) {
		const costLower = cost.toLowerCase();
		if (costLower === 'x') {
			return 'sts-x';
		} else if (costLower === '0') {
			return 'sts-unplayable';
		} else {
			return 'sts-energy';
		}
	}

	function processDescription(desc) {
		if (!desc) return '';

		let result = desc;

		result = result.replace(/\[NL\]/g, '<br>');
		result = result.replace(/\[red\](.*?)\[\/red\]/g, '<span class="sts-red">$1</span>');
		result = result.replace(/\[green\](.*?)\[\/green\]/g, '<span class="sts-green">$1</span>');
		result = result.replace(/\[blue\](.*?)\[\/blue\]/g, '<span class="sts-blue">$1</span>');
		result = result.replace(/\[yellow\](.*?)\[\/yellow\]/g, '<span class="sts-yellow">$1</span>');
		result = result.replace(/\[purple\](.*?)\[\/purple\]/g, '<span class="sts-purple">$1</span>');

		return result;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', parseSTSCards);
	} else {
		parseSTSCards();
	}

})();
