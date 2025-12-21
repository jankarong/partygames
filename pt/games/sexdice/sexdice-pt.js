// Sex Dice - Portuguese (PT-BR) patch
(function () {
    const ptActions = [
        "Beijar",
        "Mordiscar",
        "Acariciar",
        "Massagear",
        "Lamber",
        "Soprar",
        "Car\u00edcia",
        "Tocar",
        "Provocar"
    ];

    const ptWheres = [
        "Pesco\u00e7o",
        "Orelhas",
        "L\u00e1bios",
        "Peito",
        "Costas",
        "Coxas",
        "Cintura",
        "Ombros",
        "Bra\u00e7os internos"
    ];

    const ptTimes = [
        "5 segundos",
        "10 segundos",
        "15 segundos",
        "20 segundos",
        "25 segundos",
        "30 segundos"
    ];

    function applyTranslations() {
        if (typeof actions !== "undefined") {
            actions = [...ptActions];
        }
        if (typeof wheres !== "undefined") {
            wheres = [...ptWheres];
        }
        if (typeof times !== "undefined") {
            times = [...ptTimes];
        }
        if (typeof renderAllOptions === "function") {
            renderAllOptions();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyTranslations);
    } else {
        applyTranslations();
    }
})();
