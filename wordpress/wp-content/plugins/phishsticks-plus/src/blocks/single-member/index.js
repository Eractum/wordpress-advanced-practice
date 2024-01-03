import { registerBlockType } from '@wordpress/blocks';
import icons from '../../icons.js';
import './main.css';
import save from "./save.js";
import edit from "./edit.js";

registerBlockType('phishsticks-plus/team-member', {
    icon: {
        src: icons.primary
    },
    edit,
    save
});