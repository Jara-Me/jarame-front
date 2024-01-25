// main.ts

import ClassicEditor from './components/ckeditor';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Context } from "@ckeditor/ckeditor5-core";
import { Image } from '@ckeditor/ckeditor5-image';

ClassicEditor
    // Note that you do not have to specify the plugin and toolbar configuration — using defaults from the build.
    .create( document.querySelector( '#app' ) as HTMLElement,
    {
        plugins: [
            Essentials,
            Autoformat,
            Bold,
            Italic,
            Heading,
            Paragraph,
            Image
        ],

        toolbar: [
            'heading',
            'bold',
            'italic',
            'insertImage'
        ]
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
