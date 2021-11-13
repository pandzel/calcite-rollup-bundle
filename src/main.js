import "./assetInterceptor";
import './style.css';

import { defineCustomElements, setAssetPath } from '@esri/calcite-components/dist/custom-elements/index.js';

const assetPath =
        document.currentScript.src ||

        // fallback for cases where all JS is embedded in a script tag (i.e., no src)
        document.location.href;

// point to calcite-components assets copied over by rollup
setAssetPath(assetPath);

defineCustomElements();
