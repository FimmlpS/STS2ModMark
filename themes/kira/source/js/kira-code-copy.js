window.addEventListener('DOMContentLoaded', () => {
	const codeBlocks = document.querySelectorAll('figure.highlight');
	if (!codeBlocks.length) return;

	const showCopySuccess = function(message) {
		const toast = document.createElement('div');
		toast.style.cssText = `
			position: fixed;
			top: 20px;
			left: 50%;
			transform: translateX(-50%);
			background-color: #4caf50;
			color: white;
			padding: 12px 24px;
			border-radius: 4px;
			font-size: 14px;
			z-index: 10000;
			box-shadow: 0 2px 8px rgba(0,0,0,0.2);
			opacity: 0;
			transition: opacity 0.3s;
		`;
		toast.textContent = message;
		document.body.appendChild(toast);
		
		setTimeout(() => {
			toast.style.opacity = '1';
		}, 10);
		
		setTimeout(() => {
			toast.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(toast);
			}, 300);
		}, 2000);
	};

	const addCopyButton = function (codeBlock) {
		const copyWrapper = document.createElement('div');
		copyWrapper.setAttribute('class', 'kira-codeblock-copy-wrapper');

		let copiedTimeout = null;

		copyWrapper.addEventListener('click', async (ev) => {
			ev.preventDefault();
			ev.stopPropagation();
			
			const highlightDom = ev.target.closest('figure.highlight');
			if (!highlightDom) return;
			
			const code = highlightDom.querySelector('code');
			if (!code) return;

			let copiedCode = '';

			(function traverseChildNodes(node) {
				if (!node) return;
				const childNodes = node.childNodes;
				childNodes.forEach((child) => {
					switch (child.nodeName) {
						case '#text':
							copiedCode += child.nodeValue;
							break;
						case 'BR':
							copiedCode += '\n';
							break;
						default:
							traverseChildNodes(child);
					}
				});
			})(code);

			try {
				await navigator.clipboard.writeText(copiedCode.slice(0, -1));
				
				if (!!copiedTimeout) clearTimeout(copiedTimeout);

				copyWrapper.classList.add('kira-codeblock-copy-wrapper-copied');
				showCopySuccess('复制成功');
				
				copiedTimeout = setTimeout(() => {
					copyWrapper.classList.remove('kira-codeblock-copy-wrapper-copied');
					copiedTimeout = null;
				}, 1500);
			} catch (err) {
				console.error('复制失败:', err);
				showCopySuccess('复制失败，请手动复制');
			}
		});
		codeBlock.appendChild(copyWrapper);
	};

	codeBlocks.forEach(addCopyButton);
});
