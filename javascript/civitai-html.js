"use strict";

function select_model(model_name) {
	let model_dropdown = gradioApp().querySelector('#eventtext1 textarea');
	if (model_dropdown && model_name) {
		let randomNumber = Math.floor(Math.random() * 1000);
		let paddedNumber = String(randomNumber).padStart(3, '0');
		model_dropdown.value = model_name + "." + paddedNumber;
		updateInput(model_dropdown)
	}
}

function updateCardSize(width, height) {
    var styleSheet = document.styleSheets[0];
    var imgKeyframes = `width: ${width}em !important; height: ${height}em !important;`;
    var fontSize = (width / 8) * 100;
    var textKeyframes = `font-size: ${fontSize}% !important;`;

    styleSheet.insertRule(`.civmodelcard img { ${imgKeyframes} }`, styleSheet.cssRules.length);
    styleSheet.insertRule(`.civmodelcard figcaption { ${textKeyframes} }`, styleSheet.cssRules.length);
}

function filterByBaseModel(selectedBaseModels) {
    if (!selectedBaseModels || selectedBaseModels.length === 0) {
        document.querySelectorAll('.civmodelcard').forEach(card => {
            card.style.display = 'block';
        });
        return;
    }

    if (!Array.isArray(selectedBaseModels)) {
        selectedBaseModels = [selectedBaseModels];
    }

    document.querySelectorAll('.civmodelcard').forEach(card => {
        const cardBaseModel = card.getAttribute('base-model');
        let shouldDisplay = false;

        for (let i = 0; i < selectedBaseModels.length; i++) {
            if (cardBaseModel === selectedBaseModels[i]) {
                shouldDisplay = true;
                break;
            }

            if (selectedBaseModels[i] === "SD 2.0" && (cardBaseModel === "SD 2.0" || cardBaseModel === "SD 2.0 768")) {
                shouldDisplay = true;
                break;
            }

            if (selectedBaseModels[i] === "SD 2.1" && ["SD 2.1", "SD 2.1 768", "SD 2.1 Unclip"].includes(cardBaseModel)) {
                shouldDisplay = true;
                break;
            }
        }

        card.style.display = shouldDisplay ? 'block' : 'none';
    });
}

function installedCard(modelName) {
    console.log(`Model ${modelName} has been enabled.`);  // Added console log
    const parentDiv = document.querySelector('.civmodellist');

    if (parentDiv) {
        const cards = parentDiv.querySelectorAll('.civmodelcard');

        cards.forEach((card) => {
            const onclickAttr = card.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`select_model('${modelName}')`)) {
                card.className = 'civmodelcard  civmodelcardinstalled';
            }
        });
    }
}

function removedCard(modelName) {
    console.log(`Model ${modelName} has been disabled.`);  // Added console log
    const parentDiv = document.querySelector('.civmodellist');

    if (parentDiv) {
        const cards = parentDiv.querySelectorAll('.civmodelcard');
        
        cards.forEach((card) => {
            const onclickAttr = card.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes(`select_model('${modelName}')`)) {
                card.className = 'civmodelcard ';
            }
        });
    }
}
