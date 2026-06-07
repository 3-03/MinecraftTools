import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.1/+esm';
import * as skinview3d from 'https://cdn.jsdelivr.net/npm/skinview3d@3.4.2/+esm';

(function () {
    'use strict';

    // Data Structures
    const ARMOR_MATERIALS = {
        netherite: { name: 'Незерит', color: '#2d2d30', item: 'netherite', label: 'Незеритовый', icon: 'netherite_ingot' },
        diamond: { name: 'Алмаз', color: '#4dedf5', item: 'diamond', label: 'Алмазный', icon: 'diamond' },
        gold: { name: 'Золото', color: '#ffe135', item: 'golden', label: 'Золотой', icon: 'gold_ingot' },
        iron: { name: 'Железо', color: '#d3d3d3', item: 'iron', label: 'Железный', icon: 'iron_ingot' },
        chainmail: { name: 'Кольчуга', color: '#8d9c9c', item: 'chainmail', label: 'Кольчужный', icon: 'chainmail_chestplate' },
        leather: { name: 'Кожа', color: '#a06540', item: 'leather', label: 'Кожаный', icon: 'leather' },
        turtle: { name: 'Панцирь', color: '#14b24b', item: 'turtle', label: 'Черепаший', icon: 'turtle_helmet' }
    };

    const TRIM_MATERIALS = {
        redstone: { name: 'Редстоун', color: '#ff3b30', item: 'redstone', icon: 'redstone' },
        emerald: { name: 'Изумруд', color: '#34c759', item: 'emerald', icon: 'emerald' },
        lapis: { name: 'Лазурит', color: '#007aff', item: 'lapis_lazuli', icon: 'lapis_lazuli' },
        amethyst: { name: 'Аметист', color: '#af52de', item: 'amethyst_shard', icon: 'amethyst_shard' },
        gold: { name: 'Золото', color: '#ffcc00', item: 'gold_ingot', icon: 'gold_ingot' },
        diamond: { name: 'Алмаз', color: '#5ac8fa', item: 'diamond', icon: 'diamond' },
        netherite: { name: 'Незерит', color: '#444446', item: 'netherite_ingot', icon: 'netherite_ingot' },
        copper: { name: 'Медь', color: '#ff9500', item: 'copper_ingot', icon: 'copper_ingot' },
        quartz: { name: 'Кварц', color: '#ffffff', item: 'quartz', icon: 'quartz' },
        iron: { name: 'Железо', color: '#e5e5ea', item: 'iron_ingot', icon: 'iron_ingot' }
    };

    const TRIM_PATTERNS = {
        silence: { name: 'Silence (Тишина)', item: 'silence_armor_trim_smithing_template', mc: 'silence', icon: 'silence_armor_trim_smithing_template', dupe: 'cobbled_deepslate', dupeName: 'Дробленый глубинный сланец', loc: 'Древний город (Сундуки, 1.2%)' },
        sentry: { name: 'Sentry (Часовой)', item: 'sentry_armor_trim_smithing_template', mc: 'sentry', icon: 'sentry_armor_trim_smithing_template', dupe: 'cobblestone', dupeName: 'Булыжник', loc: 'Аванпост разбойников (Сундуки, 25%)' },
        vex: { name: 'Vex (Вредна)', item: 'vex_armor_trim_smithing_template', mc: 'vex', icon: 'vex_armor_trim_smithing_template', dupe: 'cobblestone', dupeName: 'Булыжник', loc: 'Лесной особняк (Сундуки, 50%)' },
        rib: { name: 'Rib (Ребро)', item: 'rib_armor_trim_smithing_template', mc: 'rib', icon: 'rib_armor_trim_smithing_template', dupe: 'netherrack', dupeName: 'Незерак', loc: 'Адская крепость (Сундуки, 6.7%)' },
        spire: { name: 'Spire (Шпиль)', item: 'spire_armor_trim_smithing_template', mc: 'spire', icon: 'spire_armor_trim_smithing_template', dupe: 'purpur_block', dupeName: 'Пурпуровый блок', loc: 'Город Края (Сундуки, 6.7%)' },
        coast: { name: 'Coast (Берег)', item: 'coast_armor_trim_smithing_template', mc: 'coast', icon: 'coast_armor_trim_smithing_template', dupe: 'cobblestone', dupeName: 'Булыжник', loc: 'Кораблекрушение (Сундуки, 16.7%)' },
        ward: { name: 'Ward (Оберег)', item: 'ward_armor_trim_smithing_template', mc: 'ward', icon: 'ward_armor_trim_smithing_template', dupe: 'cobbled_deepslate', dupeName: 'Дробленый глубинный сланец', loc: 'Древний город (Сундуки, 5%)' },
        eye: { name: 'Eye (Око)', item: 'eye_armor_trim_smithing_template', mc: 'eye', icon: 'eye_armor_trim_smithing_template', dupe: 'end_stone', dupeName: 'Эндерняк', loc: 'Крепость (Библиотека 100%, Сундуки 10%)' },
        snout: { name: 'Snout (Рыло)', item: 'snout_armor_trim_smithing_template', mc: 'snout', icon: 'snout_armor_trim_smithing_template', dupe: 'blackstone', dupeName: 'Чернит', loc: 'Развалины бастиона (Сундуки, 8.3%)' },
        wild: { name: 'Wild (Дикий)', item: 'wild_armor_trim_smithing_template', mc: 'wild', icon: 'wild_armor_trim_smithing_template', dupe: 'mossy_cobblestone', dupeName: 'Замшелый булыжник', loc: 'Храм в джунглях (Сундуки, 33%)' },
        dune: { name: 'Dune (Дюна)', item: 'dune_armor_trim_smithing_template', mc: 'dune', icon: 'dune_armor_trim_smithing_template', dupe: 'sandstone', dupeName: 'Песчаник', loc: 'Храм в пустыне (Сундуки, 14.3%)' },
        wayfinder: { name: 'Wayfinder (Искатель)', item: 'wayfinder_armor_trim_smithing_template', mc: 'wayfinder', icon: 'wayfinder_armor_trim_smithing_template', dupe: 'terracotta', dupeName: 'Терракота', loc: 'Руины былых дней (Подозр. гравий, 8.3%)' },
        raiser: { name: 'Raiser (Сборщик)', item: 'raiser_armor_trim_smithing_template', mc: 'raiser', icon: 'raiser_armor_trim_smithing_template', dupe: 'terracotta', dupeName: 'Терракота', loc: 'Руины былых дней (Подозр. гравий, 8.3%)' },
        shaper: { name: 'Shaper (Формирователь)', item: 'shaper_armor_trim_smithing_template', mc: 'shaper', icon: 'shaper_armor_trim_smithing_template', dupe: 'terracotta', dupeName: 'Терракота', loc: 'Руины былых дней (Подозр. гравий, 8.3%)' },
        host: { name: 'Host (Ведущий)', item: 'host_armor_trim_smithing_template', mc: 'host', icon: 'host_armor_trim_smithing_template', dupe: 'terracotta', dupeName: 'Терракота', loc: 'Руины былых дней (Подозр. гравий, 8.3%)' },
        tide: { name: 'Tide (Прилив)', item: 'tide_armor_trim_smithing_template', mc: 'tide', icon: 'tide_armor_trim_smithing_template', dupe: 'prismarine', dupeName: 'Призмарин', loc: 'Подводная крепость (Древний страж, 20%)' }
    };

    const ARMOR_PARTS = {
        helmet: { mc: 'helmet', label: 'Шлем' },
        chestplate: { mc: 'chestplate', label: 'Нагрудник' },
        leggings: { mc: 'leggings', label: 'Поножи' },
        boots: { mc: 'boots', label: 'Ботинки' }
    };

    // Global state
    let selectedPart = 'chestplate';
    const armorState = {
        helmet: { material: 'netherite', pattern: 'silence', trim: 'amethyst', color: '#a06540' },
        chestplate: { material: 'netherite', pattern: 'silence', trim: 'amethyst', color: '#a06540' },
        leggings: { material: 'netherite', pattern: 'silence', trim: 'amethyst', color: '#a06540' },
        boots: { material: 'netherite', pattern: 'silence', trim: 'amethyst', color: '#a06540' }
    };

    try {
        const params = new URLSearchParams(window.location.search);
        const stateParam = params.get('state');
        if (stateParam) {
            const decodedState = JSON.parse(atob(stateParam));
            for (const part of ['helmet', 'chestplate', 'leggings', 'boots']) {
                if (decodedState[part]) {
                    Object.assign(armorState[part], decodedState[part]);
                }
            }
        }
    } catch(e) {
        console.error("Failed to parse state from URL:", e);
    }
    let selectedVersion = 'new';
    let skinViewer = null;
    let activeAnimation = null;

    // Meshes references
    let helmetMesh = null;
    let chestTorsoMesh = null;
    let chestLArmMesh = null;
    let chestRArmMesh = null;
    let leggingsBeltMesh = null;
    let leggingsLLegMesh = null;
    let leggingsRLegMesh = null;
    let bootsLLegMesh = null;
    let bootsRLegMesh = null;

    // Helper functions
    const $ = id => document.getElementById(id);

    // DOM References
    const armorMaterialGrid = $('armor-material-grid');
    const trimMaterialGrid = $('trim-material-grid');
    const patternGrid = $('trim-pattern-grid');
    const ingredientsList = $('ingredients-list');
    const commandTextEl = $('command-text');
    const copyBtn = $('copy-command-btn');
    const copyText = $('copy-btn-text');
    const leatherColorSection = $('leather-color-section');
    const leatherColorPicker = $('leather-color-picker');
    const leatherColorPreview = $('leather-color-preview');
    const leatherHexInput = $('leather-hex-input');
    const leatherDyeRecipe = $('leather-dye-recipe');

    const imageCache = {};
    function loadImage(url) {
        if (imageCache[url]) return Promise.resolve(imageCache[url]);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                imageCache[url] = img;
                resolve(img);
            };
            img.onerror = () => {
                reject(new Error(`Failed to load image: ${url}`));
            };
            img.src = url;
        });
    }

    function darkenColor(hex, percent) {
        let num = parseInt(hex.replace("#",""), 16),
            amt = Math.round(2.55 * percent * 100),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
    }

    const MINECRAFT_DYES = [
        { name: 'Белый краситель', item: 'white_dye', color: '#F9FFFE' },
        { name: 'Оранжевый краситель', item: 'orange_dye', color: '#F9801D' },
        { name: 'Пурпурный краситель', item: 'magenta_dye', color: '#C74EBD' },
        { name: 'Светло-синий краситель', item: 'light_blue_dye', color: '#3AB3DA' },
        { name: 'Желтый краситель', item: 'yellow_dye', color: '#FED83D' },
        { name: 'Лаймовый краситель', item: 'lime_dye', color: '#80C71F' },
        { name: 'Розовый краситель', item: 'pink_dye', color: '#F38BAA' },
        { name: 'Серый краситель', item: 'gray_dye', color: '#474F52' },
        { name: 'Светло-серый краситель', item: 'light_gray_dye', color: '#9D9D97' },
        { name: 'Бирюзовый краситель', item: 'cyan_dye', color: '#169C9C' },
        { name: 'Фиолетовый краситель', item: 'purple_dye', color: '#8932B8' },
        { name: 'Синий краситель', item: 'blue_dye', color: '#3C44AA' },
        { name: 'Коричневый краситель', item: 'brown_dye', color: '#835432' },
        { name: 'Зеленый краситель', item: 'green_dye', color: '#5E7C16' },
        { name: 'Красный краситель', item: 'red_dye', color: '#B02E26' },
        { name: 'Черный краситель', item: 'black_dye', color: '#1D1D21' }
    ];

    function hexToRgb(hex) {
        const num = parseInt(hex.replace('#', ''), 16);
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    function blendDyes(baseColorHex, dyeHexes) {
        let base = hexToRgb(baseColorHex);
        let r = base[0], g = base[1], b = base[2];
        
        let max = Math.max(r, g, b);
        let sumR = r;
        let sumG = g;
        let sumB = b;
        let sumMax = max;
        let count = 1;
        
        for (let hex of dyeHexes) {
            let c = hexToRgb(hex);
            sumR += c[0];
            sumG += c[1];
            sumB += c[2];
            sumMax += Math.max(c[0], c[1], c[2]);
            count++;
        }
        
        let avgR = sumR / count;
        let avgG = sumG / count;
        let avgB = sumB / count;
        let avgMax = sumMax / count;
        
        let maxAvg = Math.max(avgR, avgG, avgB);
        let ratio = maxAvg > 0 ? avgMax / maxAvg : 0;
        
        return [
            Math.floor(avgR * ratio),
            Math.floor(avgG * ratio),
            Math.floor(avgB * ratio)
        ];
    }

    function rgbDistanceSq(c1, c2) {
        const dr = c1[0] - c2[0];
        const dg = c1[1] - c2[1];
        const db = c1[2] - c2[2];
        return dr*dr + dg*dg + db*db;
    }

    let cachedRecipes = null;
    function getClosestRecipe(targetHex) {
        if (!cachedRecipes) {
            cachedRecipes = [];
            const dyes = MINECRAFT_DYES;
            const base = '#a06540';
            for (let i=0; i<dyes.length; i++) {
                cachedRecipes.push({ dyes: [dyes[i]], rgb: blendDyes(base, [dyes[i].color]) });
                for (let j=i; j<dyes.length; j++) {
                    cachedRecipes.push({ dyes: [dyes[i], dyes[j]], rgb: blendDyes(base, [dyes[i].color, dyes[j].color]) });
                    for (let k=j; k<dyes.length; k++) {
                        cachedRecipes.push({ dyes: [dyes[i], dyes[j], dyes[k]], rgb: blendDyes(base, [dyes[i].color, dyes[j].color, dyes[k].color]) });
                    }
                }
            }
        }
        
        const targetRgb = hexToRgb(targetHex);
        let best = null;
        let bestDist = Infinity;
        
        for (let recipe of cachedRecipes) {
            const dist = rgbDistanceSq(targetRgb, recipe.rgb);
            if (dist < bestDist) {
                bestDist = dist;
                best = recipe;
            }
        }
        
        return best;
    }

    const paletteCache = {};
    async function getPaletteMap(paletteName) {
        if (paletteCache[paletteName]) return paletteCache[paletteName];
        
        try {
            const trimPaletteUrl = 'https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/trims/color_palettes/trim_palette.png';
            const matPaletteUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/trims/color_palettes/${paletteName}.png`;
            
            const [trimPaletteImg, matPaletteImg] = await Promise.all([
                loadImage(trimPaletteUrl),
                loadImage(matPaletteUrl)
            ]);
            
            const pCanvas = document.createElement('canvas');
            pCanvas.width = trimPaletteImg.width || 8;
            pCanvas.height = 1;
            const pCtx = pCanvas.getContext('2d');
            pCtx.drawImage(trimPaletteImg, 0, 0);
            const pData = pCtx.getImageData(0, 0, pCanvas.width, 1).data;
            
            const mCanvas = document.createElement('canvas');
            mCanvas.width = matPaletteImg.width || 8;
            mCanvas.height = 1;
            const mCtx = mCanvas.getContext('2d');
            mCtx.drawImage(matPaletteImg, 0, 0);
            const mData = mCtx.getImageData(0, 0, mCanvas.width, 1).data;
            
            const colorMap = [];
            const len = Math.min(pData.length, mData.length);
            for (let i = 0; i < len; i += 4) {
                if (pData[i+3] > 0) { // key pixel is visible
                    colorMap.push({
                        key: [pData[i], pData[i+1], pData[i+2]],
                        val: [mData[i], mData[i+1], mData[i+2], mData[i+3]]
                    });
                }
            }
            
            paletteCache[paletteName] = colorMap;
            return colorMap;
        } catch (e) {
            console.error(`Failed to parse palette maps for ${paletteName}:`, e);
            return null;
        }
    }

    function findReplacementColor(r, g, b, colorMap) {
        if (!colorMap || colorMap.length === 0) return null;
        
        let bestDist = Infinity;
        let bestVal = null;
        for (const entry of colorMap) {
            const dr = r - entry.key[0];
            const dg = g - entry.key[1];
            const db = b - entry.key[2];
            const dist = dr*dr + dg*dg + db*db;
            if (dist < bestDist) {
                bestDist = dist;
                bestVal = entry.val;
            }
        }
        
        if (bestDist < 3000) {
            return bestVal;
        }
        return null;
    }

    // Canvas 2D texture generation loading textures from jsDelivr CDN
    async function generateArmorCanvas(armorMaterial, part, trimPattern, trimMaterial, leatherColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 64, 32);

        const baseColor = ARMOR_MATERIALS[armorMaterial].color;
        const trimColor = TRIM_MATERIALS[trimMaterial].color;

        const isLeggings = part === 'leggings';
        const layerNum = isLeggings ? '2' : '1';
        const armorPrefix = armorMaterial === 'gold' ? 'gold' : armorMaterial;
        
        const armorUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/models/armor/${armorPrefix}_layer_${layerNum}.png`;
        
        const trimPatternMc = TRIM_PATTERNS[trimPattern].mc;
        const trimSuffix = isLeggings ? '_leggings' : '';
        const trimUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/trims/models/armor/${trimPatternMc}${trimSuffix}.png`;

        try {
            // Draw base armor texture
            const armorImg = await loadImage(armorUrl);
            
            if (armorMaterial === 'leather' && leatherColor) {
                // Tint base layer
                const tintCanvas = document.createElement('canvas');
                tintCanvas.width = 64; tintCanvas.height = 32;
                const tintCtx = tintCanvas.getContext('2d');
                tintCtx.drawImage(armorImg, 0, 0);
                tintCtx.globalCompositeOperation = 'multiply';
                tintCtx.fillStyle = leatherColor;
                tintCtx.fillRect(0, 0, 64, 32);
                
                // Restore alpha using source-in
                const finalBaseCanvas = document.createElement('canvas');
                finalBaseCanvas.width = 64; finalBaseCanvas.height = 32;
                const finalBaseCtx = finalBaseCanvas.getContext('2d');
                finalBaseCtx.drawImage(armorImg, 0, 0);
                finalBaseCtx.globalCompositeOperation = 'source-in';
                finalBaseCtx.drawImage(tintCanvas, 0, 0);
                
                ctx.drawImage(finalBaseCanvas, 0, 0);

                // Draw overlay
                const overlayUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/models/armor/leather_layer_${layerNum}_overlay.png`;
                try {
                    const overlayImg = await loadImage(overlayUrl);
                    ctx.drawImage(overlayImg, 0, 0);
                } catch(e) {}
            } else {
                ctx.drawImage(armorImg, 0, 0);
            }

            if (trimPattern) {
                const trimImg = await loadImage(trimUrl);
                const trimCanvas = document.createElement('canvas');
                trimCanvas.width = 64;
                trimCanvas.height = 32;
                const trimCtx = trimCanvas.getContext('2d');
                trimCtx.drawImage(trimImg, 0, 0);

                let paletteName = trimMaterial;
                if (trimMaterial === armorMaterial && ['gold', 'iron', 'diamond', 'netherite'].includes(trimMaterial)) {
                    paletteName = `${trimMaterial}_darker`;
                }

                const colorMap = await getPaletteMap(paletteName);
                if (colorMap) {
                    const trimImgData = trimCtx.getImageData(0, 0, 64, 32);
                    const data = trimImgData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const a = data[i+3];
                        if (a > 0) {
                            const r = data[i];
                            const g = data[i+1];
                            const b = data[i+2];
                            const rep = findReplacementColor(r, g, b, colorMap);
                            if (rep) {
                                data[i] = rep[0];
                                data[i+1] = rep[1];
                                data[i+2] = rep[2];
                                data[i+3] = Math.round((a / 255) * rep[3]);
                            }
                        }
                    }
                    trimCtx.putImageData(trimImgData, 0, 0);
                } else {
                    // Fallback to flat tint
                    trimCtx.globalCompositeOperation = 'source-in';
                    trimCtx.fillStyle = trimColor;
                    trimCtx.fillRect(0, 0, 64, 32);
                }

                // Overlay the trim on the base armor
                ctx.drawImage(trimCanvas, 0, 0);
            }
        } catch (err) {
            console.warn("Failed to load real textures, falling back to flat colors:", err);
            
            // Fallback rendering
            ctx.fillStyle = baseColor;
            if (part === 'helmet') {
                ctx.fillRect(0, 0, 32, 16);
                ctx.fillStyle = darkenColor(baseColor, -0.15);
                ctx.fillRect(0, 8, 8, 8);
                ctx.fillRect(16, 8, 8, 8);
                ctx.fillRect(8, 0, 8, 8);
                ctx.clearRect(10, 12, 4, 3);
                ctx.clearRect(8, 14, 8, 2);

                if (trimPattern) {
                    ctx.fillStyle = trimColor;
                    if (trimPattern === 'sentry') {
                        ctx.fillRect(8, 8, 8, 2);
                    } else if (trimPattern === 'rib') {
                        ctx.fillRect(8, 10, 8, 1);
                        ctx.fillRect(8, 12, 8, 1);
                    } else {
                        ctx.fillRect(8, 8, 1, 8);
                        ctx.fillRect(15, 8, 1, 8);
                        ctx.fillRect(9, 8, 6, 1);
                    }
                }
            } else if (part === 'chestplate') {
                ctx.fillRect(16, 16, 24, 16); // Torso
                ctx.fillRect(40, 16, 24, 16); // Arms
                ctx.clearRect(20, 16, 8, 2); // Neck hole
                ctx.fillStyle = darkenColor(baseColor, -0.15);
                ctx.fillRect(16, 20, 4, 12);
                ctx.fillRect(40, 20, 4, 12);

                if (trimPattern) {
                    ctx.fillStyle = trimColor;
                    if (trimPattern === 'sentry') {
                        ctx.fillRect(20, 20, 8, 2);
                        ctx.fillRect(44, 20, 4, 2);
                    } else if (trimPattern === 'rib') {
                        ctx.fillRect(20, 22, 8, 1);
                        ctx.fillRect(20, 25, 8, 1);
                        ctx.fillRect(20, 28, 8, 1);
                    } else {
                        ctx.fillRect(20, 20, 1, 12);
                        ctx.fillRect(27, 20, 1, 12);
                        ctx.fillRect(44, 20, 4, 1);
                    }
                }
            } else if (part === 'leggings') {
                ctx.fillRect(16, 16, 24, 16); // Waist
                ctx.fillRect(0, 16, 16, 16); // Legs
                ctx.fillStyle = darkenColor(baseColor, -0.15);
                ctx.fillRect(0, 20, 4, 12);

                if (trimPattern) {
                    ctx.fillStyle = trimColor;
                    if (trimPattern === 'sentry') {
                        ctx.fillRect(20, 20, 8, 2);
                        ctx.fillRect(4, 20, 4, 2);
                    } else if (trimPattern === 'rib') {
                        ctx.fillRect(4, 22, 4, 1);
                        ctx.fillRect(4, 26, 4, 1);
                    } else {
                        ctx.fillRect(20, 20, 8, 1);
                        ctx.fillRect(4, 20, 1, 12);
                    }
                }
            } else if (part === 'boots') {
                ctx.fillRect(0, 16, 16, 16); // Lower leg
                ctx.clearRect(0, 16, 16, 10); // Clear upper leg parts
                ctx.fillStyle = darkenColor(baseColor, -0.15);
                ctx.fillRect(0, 28, 4, 4);

                if (trimPattern) {
                    ctx.fillStyle = trimColor;
                    ctx.fillRect(0, 28, 16, 1);
                }
            }
        }

        return canvas;
    }

    // Helper: update box materials from texture coordinates with support for mirroring left limbs
    function updateBoxMaterials(mesh, canvas, rects, isLeftLimb = false) {
        rects.forEach((r, idx) => {
            let srcRect = r;
            if (!isLeftLimb) {
                if (idx === 0) {
                    srcRect = rects[1];
                } else if (idx === 1) {
                    srcRect = rects[0];
                }
            }

            const faceCanvas = document.createElement('canvas');
            faceCanvas.width = srcRect[2];
            faceCanvas.height = srcRect[3];
            const faceCtx = faceCanvas.getContext('2d');

            const shouldMirror = isLeftLimb;
            if (shouldMirror) {
                faceCtx.translate(srcRect[2], 0);
                faceCtx.scale(-1, 1);
            }

            faceCtx.drawImage(canvas, srcRect[0], srcRect[1], srcRect[2], srcRect[3], 0, 0, srcRect[2], srcRect[3]);
            faceCtx.setTransform(1, 0, 0, 1, 0, 0); // reset transform for getImageData

            // Hide fully transparent faces to prevent depth buffer glitches and Z-fighting
            const imgData = faceCtx.getImageData(0, 0, srcRect[2], srcRect[3]).data;
            let hasPixels = false;
            for (let i = 3; i < imgData.length; i += 4) {
                if (imgData[i] > 0) {
                    hasPixels = true;
                    break;
                }
            }

            if (!hasPixels) {
                mesh.material[idx].visible = false;
                return;
            }

            mesh.material[idx].visible = true;

            const texture = new THREE.CanvasTexture(faceCanvas);
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;

            if (mesh.material[idx].map) {
                mesh.material[idx].map.dispose();
            }

            mesh.material[idx].map = texture;
            mesh.material[idx].needsUpdate = true;
        });
    }

    // Create a 3D box mesh and link to bone group
    function buildBoxMesh(width, height, depth, localX, localY, localZ, parentGroup) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const materials = [];
        for (let i = 0; i < 6; i++) {
            materials.push(new THREE.MeshBasicMaterial({ 
                transparent: true, 
                alphaTest: 0.5, 
                side: THREE.DoubleSide 
            }));
        }
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(localX, localY, localZ);
        if (parentGroup) {
            parentGroup.add(mesh);
        }
        return mesh;
    }

    // Setup the Three.js armor attachments (Restored to original bulky proportions as requested by user)
    function setupArmor() {
        const player = skinViewer.playerObject;
        if (!player || !player.skin) return;

        const model = player.skin;

        // Head Group (Layer 1)
        helmetMesh = buildBoxMesh(10.0, 10.0, 10.0, 0, 4, 0, model.head);

        // Body Group (Layer 1 & 2)
        // Reverted Y offset back to 0
        chestTorsoMesh = buildBoxMesh(10.0, 14.0, 6.0, 0, 0, 0, model.body);
        leggingsBeltMesh = buildBoxMesh(9.0, 13.0, 5.0, 0, 0, 0, model.body);

        // Left/Right Arm Groups (Layer 1)
        chestLArmMesh = buildBoxMesh(6.0, 14.0, 6.0, 1.0, -4, 0, model.leftArm);
        chestRArmMesh = buildBoxMesh(6.0, 14.0, 6.0, -1.0, -4, 0, model.rightArm);

        // Left/Right Leg Groups (Layer 1 & 2)
        // No X offset — boots perfectly overlap, polygonOffset resolves Z-fighting cleanly
        leggingsLLegMesh = buildBoxMesh(5.0, 13.0, 5.0, 0, -6, 0, model.leftLeg);
        leggingsRLegMesh = buildBoxMesh(5.0, 13.0, 5.0, 0, -6, 0, model.rightLeg);

        bootsLLegMesh = buildBoxMesh(6.0, 14.0, 6.0, 0, -6, 0, model.leftLeg);
        bootsRLegMesh = buildBoxMesh(6.0, 14.0, 6.0, 0, -6, 0, model.rightLeg);

        // Use polygonOffset to resolve Z-fighting without moving geometry.
        // This nudges the depth value in the GPU's depth buffer so overlapping
        // coplanar faces have a clear winner, while staying physically in place.
        function applyPolygonOffset(mesh) {
            mesh.material.forEach(mat => {
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = -1;
                mat.polygonOffsetUnits = -1;
            });
        }
        // Left limbs win over right limbs where they overlap in the center
        // (Removed for legs to prevent asymmetry. Symmetry will be restored by microscopic idle rotation)
        // Arms win over torso where they overlap on the sides
        applyPolygonOffset(chestLArmMesh);
        applyPolygonOffset(chestRArmMesh);
    }

    // Refresh meshes visibility and textures
    async function updateVisualizer() {
        if (!helmetMesh) return;

        // Hide all meshes during loading to avoid solid white glitches
        helmetMesh.visible = false;
        chestTorsoMesh.visible = false;
        chestLArmMesh.visible = false;
        chestRArmMesh.visible = false;
        leggingsBeltMesh.visible = false;
        leggingsLLegMesh.visible = false;
        leggingsRLegMesh.visible = false;
        bootsLLegMesh.visible = false;
        bootsRLegMesh.visible = false;

        // Helmet UV slices
        const headRects = [
            [0, 8, 8, 8],   // Right
            [16, 8, 8, 8],  // Left
            [8, 0, 8, 8],   // Top
            [16, 0, 8, 8],  // Bottom
            [8, 8, 8, 8],   // Front
            [24, 8, 8, 8]   // Back
        ];

        // Torso UV slices
        const torsoRects = [
            [16, 20, 4, 12], // Right
            [28, 20, 4, 12], // Left
            [20, 16, 8, 4],  // Top
            [28, 16, 8, 4],  // Bottom
            [20, 20, 8, 12], // Front
            [32, 20, 8, 12]  // Back
        ];

        // Limbs UV slices
        const limbRects = [
            [40, 20, 4, 12], // Right
            [48, 20, 4, 12], // Left
            [44, 16, 4, 4],  // Top
            [48, 16, 4, 4],  // Bottom
            [44, 20, 4, 12], // Front
            [52, 20, 4, 12]  // Back
        ];

        const legRects = [
            [0, 20, 4, 12],  // Right
            [8, 20, 4, 12],  // Left
            [4, 16, 4, 4],   // Top
            [8, 16, 4, 4],   // Bottom
            [4, 20, 4, 12],  // Front
            [12, 20, 4, 12]  // Back
        ];

        try {
            // Render canvases asynchronously
            const [helmCanvas, chestCanvas, legCanvas, bootCanvas] = await Promise.all([
                generateArmorCanvas(armorState.helmet.material, 'helmet', armorState.helmet.pattern, armorState.helmet.trim, armorState.helmet.color),
                generateArmorCanvas(armorState.chestplate.material, 'chestplate', armorState.chestplate.pattern, armorState.chestplate.trim, armorState.chestplate.color),
                generateArmorCanvas(armorState.leggings.material, 'leggings', armorState.leggings.pattern, armorState.leggings.trim, armorState.leggings.color),
                generateArmorCanvas(armorState.boots.material, 'boots', armorState.boots.pattern, armorState.boots.trim, armorState.boots.color)
            ]);

            // Update textures on 3D boxes (Left limbs are mirrored horizontally)
            updateBoxMaterials(helmetMesh, helmCanvas, headRects, false);
            updateBoxMaterials(chestTorsoMesh, chestCanvas, torsoRects, false);
            updateBoxMaterials(chestLArmMesh, chestCanvas, limbRects, true);
            updateBoxMaterials(chestRArmMesh, chestCanvas, limbRects, false);
            updateBoxMaterials(leggingsBeltMesh, legCanvas, torsoRects, false);
            updateBoxMaterials(leggingsLLegMesh, legCanvas, legRects, true);
            updateBoxMaterials(leggingsRLegMesh, legCanvas, legRects, false);
            updateBoxMaterials(bootsLLegMesh, bootCanvas, legRects, true);
            updateBoxMaterials(bootsRLegMesh, bootCanvas, legRects, false);

            // Always visible
            helmetMesh.visible = true;
            chestTorsoMesh.visible = true;
            chestLArmMesh.visible = true;
            chestRArmMesh.visible = true;
            leggingsBeltMesh.visible = true;
            leggingsLLegMesh.visible = true;
            leggingsRLegMesh.visible = true;
            bootsLLegMesh.visible = true;
            bootsRLegMesh.visible = true;
        } catch (err) {
            console.error("Error rendering 3D armor textures:", err);
        }
    }

    function getRepresentativeState() {
        if (selectedPart !== 'all') return armorState[selectedPart];
        const parts = ['helmet', 'chestplate', 'leggings', 'boots'];
        const first = armorState.helmet;
        return {
            material: parts.every(p => armorState[p].material === first.material) ? first.material : null,
            pattern: parts.every(p => armorState[p].pattern === first.pattern) ? first.pattern : null,
            trim: parts.every(p => armorState[p].trim === first.trim) ? first.trim : null,
            color: parts.every(p => armorState[p].color === first.color) ? first.color : null,
        };
    }

    function updateSelectorsUI() {
        const state = getRepresentativeState();
        document.querySelectorAll('#armor-material-grid .swatch').forEach(b => {
            const matKey = b.getAttribute('data-key');
            if (matKey === 'turtle') {
                b.style.display = (selectedPart === 'helmet') ? 'flex' : 'none';
            }
            b.classList.toggle('active', state.material && matKey === state.material);
        });
        document.querySelectorAll('#trim-pattern-grid .swatch').forEach(b => {
            b.classList.toggle('active', state.pattern && b.getAttribute('data-key') === state.pattern);
        });
        document.querySelectorAll('#trim-material-grid .swatch').forEach(b => {
            b.classList.toggle('active', state.trim && b.getAttribute('data-key') === state.trim);
        });

        if (state.material === 'leather') {
            leatherColorSection.style.display = 'block';
            const col = state.color || '#a06540';
            leatherColorPicker.value = col;
            leatherColorPreview.style.backgroundColor = col;
            leatherHexInput.value = col.toUpperCase();
            updateLeatherRecipe(col);
        } else {
            leatherColorSection.style.display = 'none';
        }

        // Update tab icons dynamically
        ['helmet', 'chestplate', 'leggings', 'boots'].forEach(part => {
            const mat = armorState[part].material;
            const prefix = mat === 'gold' ? 'golden' : (mat === 'chainmail' ? 'chainmail' : mat);
            const imgEl = $('tab-' + part) ? $('tab-' + part).querySelector('img') : null;
            if (imgEl) {
                if (mat === 'turtle' && part !== 'helmet') {
                    // Fallback since turtle chestplate doesn't exist
                    imgEl.src = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/turtle_helmet.png`;
                } else {
                    imgEl.src = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${prefix}_${part}.png`;
                }
            }
        });
    }

    function updateLeatherRecipe(hexColor) {
        let dyesHtml = '';
        const recipe = getClosestRecipe(hexColor);
        if (recipe && recipe.dyes.length > 0) {
            const counts = {};
            for (let d of recipe.dyes) {
                counts[d.item] = counts[d.item] ? counts[d.item] + 1 : 1;
            }
            const uniqueDyes = recipe.dyes.filter((d, i, a) => a.findIndex(x => x.item === d.item) === i);
            
            dyesHtml = uniqueDyes.map(d => `
                <div class="dye-item" title="${d.name}">
                    <img src="https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${d.item}.png" alt="${d.item}">
                    <span>x${counts[d.item]}</span>
                </div>
            `).join('');
        }
        leatherDyeRecipe.innerHTML = dyesHtml;
    }

    // Populate swatches and grids
    function initSelectors() {
        // Armor Material swatches
        Object.entries(ARMOR_MATERIALS).forEach(([key, value]) => {
            const swatch = document.createElement('button');
            swatch.className = `swatch ${key === armorState[selectedPart].material ? 'active' : ''}`;
            swatch.setAttribute('data-key', key);
            swatch.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${value.icon}.png)`;
            swatch.title = value.name;
            swatch.addEventListener('click', () => {
                const partsToUpdate = selectedPart === 'all' ? ['helmet', 'chestplate', 'leggings', 'boots'] : [selectedPart];
                partsToUpdate.forEach(part => armorState[part].material = key);
                updateSelectorsUI();
                updateAll();
            });
            armorMaterialGrid.appendChild(swatch);
        });

        // Trim Pattern swatches
        Object.entries(TRIM_PATTERNS).forEach(([key, value]) => {
            const swatch = document.createElement('button');
            swatch.className = `swatch ${key === armorState[selectedPart].pattern ? 'active' : ''}`;
            swatch.setAttribute('data-key', key);
            swatch.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${value.icon}.png)`;
            swatch.title = value.name;
            swatch.addEventListener('click', () => {
                const partsToUpdate = selectedPart === 'all' ? ['helmet', 'chestplate', 'leggings', 'boots'] : [selectedPart];
                partsToUpdate.forEach(part => armorState[part].pattern = key);
                updateSelectorsUI();
                updateAll();
            });
            patternGrid.appendChild(swatch);
        });

        // Trim Material swatches
        Object.entries(TRIM_MATERIALS).forEach(([key, value]) => {
            const swatch = document.createElement('button');
            swatch.className = `swatch swatch--glow ${key === armorState[selectedPart].trim ? 'active' : ''}`;
            swatch.setAttribute('data-key', key);
            swatch.style.backgroundImage = `url(https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${value.icon}.png)`;
            swatch.style.setProperty('--glow-color', value.color + '44');
            swatch.title = value.name;
            swatch.addEventListener('click', () => {
                const partsToUpdate = selectedPart === 'all' ? ['helmet', 'chestplate', 'leggings', 'boots'] : [selectedPart];
                partsToUpdate.forEach(part => armorState[part].trim = key);
                updateSelectorsUI();
                updateAll();
            });
            trimMaterialGrid.appendChild(swatch);
        });

        // Part Switcher
        document.querySelectorAll('.part-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.part-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedPart = btn.getAttribute('data-part');
                updateSelectorsUI();
                updateCommand();
                updateSlidingBgs();
            });
        });

        // Version switcher
        document.querySelectorAll('.ver-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.ver-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedVersion = btn.getAttribute('data-ver');
                updateCommand();
                updateSlidingBgs();
            });
        });

        // Leather color picker
        function applyLeatherColor(color) {
            const partsToUpdate = selectedPart === 'all' ? ['helmet', 'chestplate', 'leggings', 'boots'] : [selectedPart];
            partsToUpdate.forEach(part => {
                if (armorState[part].material === 'leather') {
                    armorState[part].color = color;
                }
            });
            leatherColorPreview.style.backgroundColor = color;
            leatherHexInput.value = color.toUpperCase();
            updateLeatherRecipe(color);
            updateIngredients();
            updateCommand();
        }

        leatherColorPicker.addEventListener('input', (e) => applyLeatherColor(e.target.value));
        leatherColorPicker.addEventListener('change', (e) => {
            applyLeatherColor(e.target.value);
            updateAll();
        });

        leatherHexInput.addEventListener('change', (e) => {
            let val = e.target.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                leatherColorPicker.value = val;
                applyLeatherColor(val);
                updateAll();
            } else {
                e.target.value = armorState[selectedPart].color || '#A06540';
            }
        });

        // Animation switches
        document.querySelectorAll('.anim-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.anim-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const animType = btn.getAttribute('data-anim');
                setAnimation(animType);
                updateSlidingBgs();
            });
        });

        // Skin file upload listener
        $('skin-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    skinViewer.loadSkin(event.target.result, { model: 'default' });
                };
                reader.readAsDataURL(file);
            }
        });

        const shareBtn = $('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                const stateStr = btoa(JSON.stringify(armorState));
                const newUrl = window.location.origin + window.location.pathname + '?state=' + stateStr;
                window.history.replaceState({}, '', newUrl);
                navigator.clipboard.writeText(newUrl).then(() => {
                    const oldText = shareBtn.innerHTML;
                    shareBtn.innerHTML = '✅ Скопировано';
                    setTimeout(() => {
                        shareBtn.innerHTML = oldText;
                    }, 2000);
                });
            });
        }

        $('randomize-btn').addEventListener('click', () => {
            const partsToRandomize = selectedPart === 'all' 
                ? ['helmet', 'chestplate', 'leggings', 'boots'] 
                : [selectedPart];

            const materials = Object.keys(ARMOR_MATERIALS);
            const patterns = Object.keys(TRIM_PATTERNS);
            const trimMats = Object.keys(TRIM_MATERIALS);

            partsToRandomize.forEach(part => {
                let availableMaterials = materials;
                if (part !== 'helmet') {
                    availableMaterials = materials.filter(m => m !== 'turtle');
                }
                armorState[part].material = availableMaterials[Math.floor(Math.random() * availableMaterials.length)];
                armorState[part].pattern = patterns[Math.floor(Math.random() * patterns.length)];
                armorState[part].trim = trimMats[Math.floor(Math.random() * trimMats.length)];
                if (armorState[part].material === 'leather') {
                    armorState[part].color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                }
            });

            updateSelectorsUI();
            updateAll();
        });

        $('copy-command-btn').addEventListener('click', copyCommand);
    }

    function setAnimation(type) {
        if (type === 'walk') {
            skinViewer.animation = new skinview3d.WalkingAnimation();
        } else if (type === 'run') {
            skinViewer.animation = new skinview3d.RunningAnimation();
        } else {
            skinViewer.animation = null;
            const player = skinViewer.playerObject;
            if (player && player.skin) {
                const model = player.skin;
                // Add a very slight natural outward rotation to arms (inwards was used by mistake previously)
                // Add a very slight natural outward rotation to arms
                model.leftArm.rotation.set(0, 0, 0.05);
                model.rightArm.rotation.set(0, 0, -0.05);
                // Microscopic Y-rotation ensures symmetric Z-fighting resolution for overlapping boots
                model.leftLeg.rotation.set(0, 0.01, 0);
                model.rightLeg.rotation.set(0, -0.01, 0);
                model.head.rotation.set(0, 0, 0);
                model.body.rotation.set(0, 0, 0);
            }
        }
    }

    // Dynamic UI updates
    function updateIngredients() {
        if (selectedPart === 'all') {
            ingredientsList.innerHTML = `
                <div class="ingredients-header">Компоненты для крафта</div>
                <div style="font-size: 0.85rem; color: var(--ink-secondary); padding: 10px 0;">
                    Выберите конкретный элемент брони (Шлем, Нагрудник и т.д.), чтобы увидеть компоненты для крафта.
                </div>
            `;
            return;
        }

        const state = armorState[selectedPart];
        const armorData = ARMOR_MATERIALS[state.material];
        const trimData = TRIM_PATTERNS[state.pattern];
        const matData = TRIM_MATERIALS[state.trim];
        const partLabel = ARMOR_PARTS[selectedPart].label.toLowerCase();
        
        ingredientsList.innerHTML = `
            <div class="ingredients-header">Компоненты для крафта</div>
            <ul class="ingredients-items">
                <li><span class="ing-badge ing-badge--armor" style="background: ${state.material === 'leather' && state.color ? state.color : armorData.color}"></span> 1x ${armorData.label} ${partLabel}</li>
                <li><span class="ing-badge ing-badge--template"></span> 1x Шаблон: ${trimData.name.split(' (')[0]}</li>
                <li><span class="ing-badge ing-badge--material" style="background: ${matData.color}"></span> 1x ${matData.name}</li>
            </ul>
        `;
    }

    function updateCommand() {
        if (selectedPart === 'all') {
            commandTextEl.textContent = "Выберите конкретный элемент брони для генерации команды.";
            return;
        }

        const state = armorState[selectedPart];
        const armorMat = ARMOR_MATERIALS[state.material].item;
        const partMc = ARMOR_PARTS[selectedPart].mc;
        const trimMatMc = state.trim;
        const patternMc = TRIM_PATTERNS[state.pattern].mc;

        const itemName = `${armorMat}_${partMc}`;

        let command = '';
        const hasColor = state.material === 'leather' && state.color;
        const colorVal = hasColor ? parseInt(state.color.replace('#', ''), 16) : null;

        if (selectedVersion === 'new') {
            const components = [`trim={material:"minecraft:${trimMatMc}",pattern:"minecraft:${patternMc}"}`];
            if (hasColor) components.push(`dyed_color=${colorVal}`);
            command = `/give @p ${itemName}[${components.join(',')}] 1`;
        } else {
            let nbt = `Trim:{material:"minecraft:${trimMatMc}",pattern:"minecraft:${patternMc}"}`;
            if (hasColor) nbt += `,display:{color:${colorVal}}`;
            command = `/give @p ${itemName}{${nbt}} 1`;
        }

        commandTextEl.textContent = command;
    }

    function copyCommand() {
        const cmdText = commandTextEl.textContent;
        navigator.clipboard.writeText(cmdText).then(() => {
            copyBtn.classList.add('copied');
            copyText.textContent = 'Скопировано';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyText.textContent = 'Копировать';
            }, 1500);
        });
    }

    // Update segmented control sliding background
    function updateSlidingBgs() {
        document.querySelectorAll('.segmented-control').forEach(container => {
            let bg = container.querySelector('.segmented-sliding-bg');
            if (!bg) {
                bg = document.createElement('div');
                bg.className = 'segmented-sliding-bg';
                container.insertBefore(bg, container.firstChild);
            }
            // active button ignoring the background itself if it somehow gets that class
            const activeBtn = container.querySelector('.active:not(.segmented-sliding-bg)');
            if (activeBtn) {
                bg.style.width = activeBtn.offsetWidth + 'px';
                // Because container is relative and the bg has left: 0, we just set translateX to the button's offsetLeft
                bg.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
            }
        });
        
        // Also do version segmented if it exists
        document.querySelectorAll('.version-segmented').forEach(container => {
            let bg = container.querySelector('.segmented-sliding-bg');
            if (!bg) {
                bg = document.createElement('div');
                bg.className = 'segmented-sliding-bg';
                container.style.position = 'relative';
                // Adjust bg styles for this specific container since it doesn't have 3px padding
                bg.style.top = '0';
                bg.style.bottom = '0';
                bg.style.borderRadius = '6px';
                container.insertBefore(bg, container.firstChild);
            }
            const activeBtn = container.querySelector('.active:not(.segmented-sliding-bg)');
            if (activeBtn) {
                bg.style.width = activeBtn.offsetWidth + 'px';
                bg.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
            }
        });
    }

    function initAllDupes() {
        const container = $('all-dupes-grid');
        if (!container) return;
        
        let html = '';
        Object.values(TRIM_PATTERNS).forEach(patternData => {
            const blockIconUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/block/${patternData.dupe}.png`;
            const templateIconUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/${patternData.icon}.png`;
            const diamondUrl = `https://cdn.jsdelivr.net/gh/InventivetalentDev/minecraft-assets@1.20.1/assets/minecraft/textures/item/diamond.png`;

            html += `
                <div class="dupe-card">
                    <div class="dupe-card-title">
                        <img src="${templateIconUrl}" class="inline-icon">
                        ${patternData.name}
                    </div>
                    <div class="dupe-panel">
                        <div class="crafting-grid">
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${templateIconUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${blockIconUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                            <div class="crafting-slot"><img src="${diamondUrl}"></div>
                        </div>
                        <div class="crafting-arrow">➔</div>
                        <div class="crafting-result">
                            <div class="crafting-slot result-slot">
                                <img src="${templateIconUrl}">
                                <span class="item-count">2</span>
                            </div>
                        </div>
                    </div>
                    <div class="duplication-info">
                        <p class="dupe-info-row">
                            <img src="${blockIconUrl}" class="inline-icon" title="${patternData.dupeName || patternData.dupe}">
                            <strong>Блок:</strong> ${patternData.dupeName || patternData.dupe}
                        </p>
                        <p class="dupe-info-row">
                            <strong>Где найти:</strong> ${patternData.loc || 'Неизвестно'}
                        </p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function updateAll() {
        updateVisualizer();
        updateIngredients();
        updateCommand();
    }

    // Init skinview3d container
    async function initSkinViewer() {
        const canvas = $('skin-viewer-canvas');
        const container = $('visualizer-canvas');
        
        // Preload default skin to prevent white skin on load
        try {
            await loadImage('cow_skin.png');
        } catch (e) {
            console.error("Failed to preload cow skin:", e);
        }

        skinViewer = new skinview3d.SkinViewer({
            canvas: canvas,
            width: container.clientWidth,
            height: container.clientHeight,
            skin: 'cow_skin.png',
            model: 'default'
        });
        window.skinViewer = skinViewer;

        // Set orbit control options
        skinViewer.controls.enableZoom = true;
        skinViewer.controls.enablePan = false;
        skinViewer.zoom = 0.6; // Zoom out significantly

        // Auto rotate character
        skinViewer.autoRotate = false;

        // Default diagonal side angle view (Positioning camera instead of rotating character)
        skinViewer.camera.position.set(-30, 10, 40);

        // Setup window resize listener
        window.addEventListener('resize', () => {
            skinViewer.setSize(container.clientWidth, container.clientHeight);
            updateSlidingBgs();
        });

        // Initialize custom 3D armor components on loaded skin
        setupArmor();
        setAnimation('walk');
        updateAll();
    }

    // Startup
    initSelectors();
    initAllDupes();
    updateSelectorsUI();
    updateAll();
    
    // Wait for DOM layout to initialize sizes
    setTimeout(() => {
        initSkinViewer();
        updateSlidingBgs();
    }, 100);
})();
