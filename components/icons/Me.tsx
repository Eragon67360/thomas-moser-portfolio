import React, { useContext } from 'react';
import Image from 'next/image';
export const Me = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_2"
            data-name="Capa 2"
            viewBox="0 0 386.4 386.07"
            {...props}
        >
            <defs>
                <style>{".cls-1{stroke-width:0}"}</style>
            </defs>
            <g id="svg1">
                <path
                    d="M193.1 0C86.6 0 0 86.6 0 193.1c0 44.1 14.5 85.6 41.9 120.1 26.6 33.4 63.9 57.4 105.2 67.5h.14c6.74 1.63 13.49 2.89 20.06 3.76.02 0 .03.02.05.02.4.05.77.1 1.15.15.38.05.75.1 1.15.15h.05c.05 0 .1-.01.14-.03.03-.01.05-.03.08-.05 7.91.92 15.7 1.38 23.17 1.38 9.88 0 19.84-.76 29.62-2.26.06.03.12.06.18.06h.36c17.42-2.76 34.37-7.88 50.4-15.23.06-.03.11-.07.15-.12 18.98-8.79 36.29-20.48 51.45-34.74.06-.06.09-.13.11-.21a.26.26 0 0 0 .14-.06c19-17.9 34-39 44.5-62.8 10.9-24.6 16.4-50.8 16.4-78C386.1 86.6 299.5 0 193.1 0Zm-45.44 380.02c.58-3.29 5.2-27.24 9.04-31.92 2.41-2.96 3.68-4.16 4.27-4.63l.07.3c-.6.2-1.99 1.21-3.4 6.12-1.69 5.73 7.51 29.53 9.17 33.74a195.24 195.24 0 0 1-19.15-3.6Zm20.94 3.86c-.27-.04-.55-.07-.83-.11-.94-2.38-10.98-28-9.21-33.67.97-3.56 1.94-4.87 2.49-5.34l8.17 39.21c-.21-.03-.42-.06-.63-.08Zm54.22-.83c-9.81 1.51-19.81 2.28-29.72 2.28-7.41 0-15.14-.46-22.99-1.37l-8.25-40.04-.72-3.12c6.32 5.02 11.07 7.95 13.95 8.91 2.1.6 3.8 1.3 5.4 1.8 3.6 1.3 6.4 2.4 11 2.4 2.4 0 5.2-.3 9-.9 16.2-2.8 26-6.1 31.1-10.5 3-2.6 8.8-8.2 13.9-13.2 4.3-4.2 8.4-8.1 10.3-9.8 1.1-1 3.2-2.5 5.5-4.2 6.6-4.9 15.6-11.6 17.4-15.7 2.4-5.6 3.5-44.4 3.5-46-.2-.4-.3-.6-.5-.6s-.4.2-.4.4c0 .4-1.1 40.3-3.5 45.8-1.7 3.9-11 10.8-17.1 15.4-2.4 1.8-4.4 3.3-5.6 4.3-1.9 1.7-6 5.7-10.3 9.8-5.1 4.9-10.9 10.5-13.9 13.2-4.9 4.2-14.9 7.6-30.7 10.3-10.8 1.8-14.3.5-19.6-1.4-1.5-.6-3.3-1.2-5.4-1.9-2.87-.89-7.71-3.95-14.22-9.16v-.09a.407.407 0 0 0-.15-.25c-10.9-8.6-23.32-20.43-27.26-24.57-2.64-2.73-5.95-9.52-8.97-16.77-3.86-9.31-7.2-19.29-8.1-22.37-.5-1.8-1.3-4.1-2.2-6.9-2.2-6.7-4.9-15-5.8-21.1-.7-4.9-.2-12.5.4-19.8.4-5.7.9-11.7.7-16.2-.3-10.2-4.4-21-4.5-21.4-.1-.28-.22-.6-.33-.92-.73-2.85-2.65-11.91-.72-21.88 1.06-5.06 3.12-10.32 6.86-15.1 4.2-5.4 6.8-10 9.1-14 4.8-8.4 7.7-13.4 18.7-15.7 10.2-2.1 17-2.1 21.5-2.1 2.9 0 5 0 6.5-.5 4.4-1.6 35.8-10.4 44.3-7.9 4.7 1.4 9.6 9.6 14.8 18.2 4.2 6.9 8.5 14 12.8 17.8 10 8.7 13.4 12.2 16.9 18 1.9 3.1 3.4 8.3 4.8 13.2 1.3 4.4 2.4 8.5 3.8 10.9.7 1.2 1.8 3 3.1 5 3.9 6.2 9.2 14.8 10 18.5.2.8.3 1.1.6 1.1h.1c.28 0 .36-.11.35-.61.1-.16.09-.52.06-1.39-.08-2.43-.25-8.19 1.18-13.13.7-2.23 1.74-4.26 3.31-5.67 2.5-2.3 4-4.4 5.3-6 .57-1 1.04-1.68 1.44-2.22.16-.19.32-.4.48-.57 2.79-1.2 4.67-1.35 7.69-.65 6.11 1.51 12.31 14.07 12.31 20.23 0 2.93-1.08 7.55-2.23 12.45-1.16 4.97-2.37 10.11-2.47 13.73-.31 7.75-5.28 16.13-7.99 18.64-.28.27-.61.51-.94.74-2.73 1.67-6.74 2.05-9.9 1.63-.1 0-.2 0-.3.1-.04.04-.06.09-.08.13-.1 0-.2.02-.28.09-.08.08-.13.18-.12.3l2.5 48.8.49 8.93s-.02.03-.03.04c-11.52 17.4-44.39 51.05-58.95 65.67-3.86 3.87-6.41 6.39-6.91 6.88ZM273.25 368a192.49 192.49 0 0 1-49.32 15.01c.29-.29.68-.68 1.12-1.11l.22-.22c.12-.12.23-.22.35-.35 10.09-10.02 49.63-49.69 63.25-69.72l.02.32 1.01-1.65c.97-1.59 1.81-2.96 2.44-4.21.25-.51.39-1 .46-1.47l9.52 12.21c-.08 1.02-.26 2.6-.78 4.9-1.7 7.05-13.52 25.02-21.35 36.41-.13.2-.26.38-.4.58-.01.02-.03.04-.04.06-1.56 2.25-3.23 4.64-5 7.16-.79 1.11-1.31 1.84-1.48 2.07Zm18.51-64.73c.33.66.23 1.48-.3 2.46-.59 1.18-1.24 2.34-1.97 3.51l-.4-7.25c.66.05 1.96.23 2.59.92l.06.08a.39.39 0 0 0 .02.28Zm8.87 9.96c.26-.02.61.04.9.34l.1.1c.13.13.47.58.62 1.79l-1.63-2.23Zm-25.92 54.04c.08-.11.16-.22.24-.34l.08-.11c2.29-3.22 7.44-10.51 12.67-18.48 10.47-15.92 13.82-23.17 14.58-26.45.54-2 .81-3.69.81-5.18v-.03c.04-.74 0-1.39-.1-1.94l21.47 18.77c-14.71 13.77-31.43 25.12-49.74 33.76Zm50.34-34.22-22.91-20.03c-.05-.04-.11-.05-.18-.06-.65-.57-1.42-.54-1.89-.39l-7.47-9.54c-.03-.08-.05-.17-.09-.24l-.23-.34c-.9-.99-2.59-1.18-3.28-1.21l-2.14-41-.36-6.94c3.8.4 8.7-.3 11.39-2.9 2.8-2.6 7.9-11.3 8.2-19.1.1-3.5 1.3-8.6 2.4-13.4 1.2-5 2.3-9.7 2.3-12.8 0-.55-.05-1.18-.15-1.85-.89-6.41-6.42-17.76-12.76-19.32-2.99-.7-5.01-.57-7.68.5.1-2.09.1-4.87-.1-8.63-.7-8.3-1.8-11.4-3.6-16.6l-.2-.4c-.3-1.1-.6-1.7-.7-2.1.2-.2.3-.6 0-2.2-.4-2.8-.3-5.2-.2-8.3.1-1.7.2-3.7.2-6 0-3 .3-3.5.6-4 .3-.7.7-1.4.8-5.4.1-2.9.4-4.3.7-5.2.4-1.7.4-1.9-1.9-5-1.9-2.7-1.7-4.2-1.5-5.9.2-1.3.4-2.7-.3-4.8-.7-2.3-1.3-3.2-2.1-4.4-.9-1.4-2.1-3.2-4.1-7.9-2-4.8-2.6-5.2-3.1-5.5-.3-.2-.6-.4-1.6-3.4-1.4-4.1-2.3-4.6-3.4-5.2-.6-.3-1.3-.7-2.2-1.9-1.7-2.2-2.1-2.5-4-4.4-1-1-2.6-2.5-5-4.9-4.3-4.3-7.4-5.4-10.6-6.5-2-.7-4-1.4-6.5-3-5-3.2-8.6-4.5-14.6-6.6-1.7-.6-3.6-1.3-5.8-2.1-4.77-1.76-8.5-2.2-11.14-2.17-2.64.02-4.2.51-4.63.67-1.9-.21-17.72-1.87-23.78-1.83-.92 0-1.63.05-2.04.14-.19.05-.42.07-.65.08-.73.01-1.63-.11-2.65-.18-1.45-.16-3.13-.35-4.99-.35-4.07 0-9.05.93-14.51 5.35-3.68 3-8.57 6.93-9.51 7.18-.1-.02-.2-.03-.32-.02-.32-.03-.67.07-1.47.64-.9.6-2 1.4-3.1 2.2-3 2.2-6.7 5-11 6.5-3.7 1.2-4.8 2.4-6.6 4.3-1.3 1.4-3 3.1-6.2 5.5-4.4 3.4-4.6 4.6-4.8 5.4-.1.4-.1.6-2.1 1.3-.7.2-1.3.4-1.8.5-2.9.8-2.9 1-7.6 9.8l-1 1.9c-3.6 6.7-2.2 12.6-1.1 16.8.3 1.3.6 2.4.7 3.3.2 1.7-.7 2.6-2 3.9-1.5 1.5-3.5 3.4-4.3 7.5-.8 4.2-.1 8.6.7 12.9.7 4 1.3 7.9.4 10.7-1.8 5.8 7.7 32.4 8.5 34.7v.2c0 .2.2.4.4.4.54 1.52 3.06 8.58 4.03 16.3.15 1.32.26 2.6.29 3.81.17 4.53-.27 10.44-.7 16.15-.53 7.05-1.08 14.33-.49 19.27.05.51.1 1 .16 1.46.9 6.2 3.7 14.5 5.8 21.2.9 2.7 1.7 5.1 2.2 6.8 1.6 5.5 11.1 33.2 17.4 39.7 4.2 4.4 16.5 16 27.2 24.5l.4 2.07c-.59.42-1.94 1.59-4.59 4.89-4.21 5.21-9.07 31.55-9.28 32.67v.15C60.77 358.56.7 281.88.7 193.1.7 87.1 87 .8 193 .8s192.4 86.3 192.4 192.3c0 53.48-21.48 103.15-60.35 139.95Z"
                    className="cls-1"
                />
                <path
                    d="M155.6 212.8c.1 0 .1.1.2.1s.3-.1.3-.2c.1-.2 0-.4-.1-.5-.2-.1-4.7-2.7-8.3-3.1-.93-.09-2.12-.18-3.4-.11a.322.322 0 0 0-.21-.06c-2.1.08-5.34.37-8.88 1.31-.03 0-.04.04-.07.05h-.03c-.5.1-1 .3-1.4.4l-.9.3c-5.9 2.1-9.4 6-11.3 8.1-.2.3-.5.5-.6.7s-.1.4 0 .5c.1.1.2.1.3.1s.2 0 .3-.1l.7-.7c1.8-2.1 5.3-5.9 11-7.9l.9-.3c.16-.08.33-.11.49-.16-.24.62-.37 1.26-.37 1.86 0 2.5 1.81 4.63 4.29 5.33.59.17 1.23.27 1.89.27 3.3 0 6.1-2.6 6.1-5.6 0-1.2-.5-2.5-1.4-3.5 1 0 1.9.1 2.7.1 3.2.5 7.7 3.1 7.8 3.1ZM237.6 199.7c-.1 0-9.19-1.98-15.78-2.98a.401.401 0 0 0-.17-.09c-.54-.06-1.07-.14-1.58-.21-1.09-.15-2.12-.29-2.97-.29-2.49 0-2.94 0-4.38.31-.06.01-.11.05-.15.08-10.11 1.04-15.37 6.78-15.57 6.98-.1.2-.1.4 0 .5.1.1.2.1.3.1s.2 0 .3-.1c.1-.1 5-5.4 14.3-6.7-.15.23-.27.48-.38.72-.02.06-.04.11-.07.17-.22.55-.36 1.13-.36 1.7 0 2.9 2.7 5.3 6 5.3s6-2.4 6-5.3c0-.82-.18-1.56-.59-2.22-.03-.06-.05-.12-.09-.18 6.5 1 14.88 2.9 15.08 2.9s.3-.1.4-.3c0-.2-.1-.4-.3-.4ZM162.2 263.6c.2.1.4 0 .5-.1.1-.2 0-.4-.1-.5-.6-.4-1.5-1.1-1.5-1.6 0-.1 0-.2.2-.4 1.4-1 4.2-1.4 5.8.1.4.4.9.9 1.3 1.4 1.6 1.6 3.3 3.5 5.1 3.9 1.1.3 3.2.7 5.3.7 1.6 0 3.1-.2 4.3-.9 1.7-1 2.2-2.2 2.7-3.4.3-.7.6-1.5 1.2-2.1.1-.2.3-.3.5-.5 1.7-1.9 4.1-4.5 8.2-3.7 2.9.6 3.9 2 3.9 2.5 0 .8 0 1.5-2.5 1.9-.2 0-.3.2-.3.4s.2.3.4.3c2.9-.5 3.1-1.5 3.1-2.7 0-.9-1.2-2.6-4.5-3.3-4.5-.9-7.1 2-8.9 3.9l-.5.5c-.7.8-1 1.6-1.3 2.3-.5 1.1-.9 2.2-2.4 3-2.6 1.5-7.6.5-9 .2-1.6-.4-3.3-2.2-4.8-3.7-.5-.5-.9-1-1.4-1.4-1.7-1.7-5-1.1-6.6 0-.5.3-.6.7-.6 1 0 1.1 1.7 2.1 1.9 2.2ZM222 286c-2.4 1.8-10.6 2.4-17.1 2.9-4.1.3-7.6.6-9.6 1.1-2.9.6-4.5 1.5-5.7 2.1-1.1.6-1.9 1-3.1 1-2.6 0-5.1 0-9.4-.6-1.7-.2-4.3.6-7.6 1.5-5.1 1.5-11.4 3.3-16.8 2.2-.2 0-.4.1-.4.3s.1.4.3.4c1.2.2 2.5.3 3.7.3 4.6 0 9.4-1.4 13.4-2.6 3.1-.7 5.8-1.5 7.3-1.3 4.3.6 6.8.6 9.5.6 1.3 0 2.3-.5 3.4-1.1 1.2-.6 2.8-1.4 5.6-2 2-.5 5.6-.8 9.5-1.1 7-.6 14.8-1.2 17.4-3.1.2-.1.2-.4.1-.5-.1-.2-.4-.2-.5-.1Z"
                    className="cls-1"
                />
                <path
                    d="M135 205c11.3-3.1 17.6 2.8 17.6 2.9.1.1.4.1.5 0 .1-.1.1-.4 0-.5-.1-.1-6.6-6.3-18.4-3.1-10.6 4.9-14.6 11.5-14.8 11.7-.1.2 0 .4.1.5.1 0 .1.1.2.1s.3-.1.3-.2c.1-.1 4.2-6.7 14.5-11.4ZM197.3 200.5c0-.1.1-.2.2-.3 0-.1 4.6-6.3 10.2-7.2 6.8-1.2 11.8-1.9 17.7-.7 5.9 1.2 10.5 5.3 10.5 5.3.2.1.4.1.5 0 .1-.2.1-.4 0-.5-.2-.2-4.7-4.3-10.9-5.5-6-1.2-11-.5-17.9.7-5.9 1-10.4 7.3-10.6 7.6-.1.2-.1.4.1.5.1 0 .1.1.2.1ZM198.7 301.6c-.1-.2-.4-.2-.5-.1-5.2 3.6-19.4 3.2-19.6 3.2s-.4.2-.4.4.2.4.4.4h1.4c3.8 0 14.1-.3 18.7-3.4 0-.1.1-.3 0-.5ZM202.9 319.2c-13.4-3.3-18.3 1.5-18.5 1.7-.1.1-.1.4 0 .5s.2.2.3.2.2 0 .3-.1c0 0 4.8-4.7 17.7-1.5.2 0 .4-.1.5-.3 0-.2-.1-.4-.3-.5ZM168.5 248.6c.3 0 .4-.1.5-.3 1.9-7.5 3.5-31.9 2.8-32.5-.1-.1-.3-.1-.4-.1-.2.1-.3.3-.3.5 0 .1 0 .2.1.3.1 2.8-.9 23.4-3 31.7 0 .1.1.3.3.4ZM151.4 191.5s.09-.02.14-.04c.12-.01.23-.07.29-.18.02-.04.02-.09.03-.13 0-.02.01-.04.01-.06a.35.35 0 0 0-.08-.22 23.333 23.333 0 0 0-3.18-3.18c-1.19-1-2.65-2.02-4.26-2.73-4.02-1.77-23.5-1.21-28.13 1.31-4.61 2.46-6.61 15.23-6.69 15.77-.03.17.07.33.22.4.02.02.03.04.05.06h.2c.1 0 .2 0 .3-.1.1-.1 8-9.9 14.6-11.6 6.5-1.7 26.3.7 26.5.7ZM243.8 177.5c-.6-.6-13.3-13.8-20.3-13.8h-.4c-2.24.21-7.09 1.77-12.57 3.85-10.43 3.96-23.15 9.82-24.54 11.84-2.1 3.15.67 8.18.79 8.39.02.04.06.08.09.11.04.06.07.11.13.11h.1c.09 0 .11-.01.18-.08.01 0 .02 0 .03-.01.21-.14 16.21-10.78 28.06-14.41 3.27-1 6.23-1.45 8.44-1 10.4 2 19.4 5.6 19.5 5.7.18 0 .36 0 .46-.15.01-.01.03-.02.05-.03.03-.05.03-.1.04-.16 0-.03.02-.05.02-.08v-.02a.5.5 0 0 0-.07-.25ZM287 220.1c.1.1.3 0 .4 0 0 0 .9-.7 1.5-.4.3.2 1 1 .5 4.9 0 .2.1.4.3.4h.1c.2 0 .3-.1.4-.3.5-3.2.2-5.1-.9-5.6-.6-.3-1.3-.1-1.7.1.1-4.3.9-27.6 8-29.4 6.7-1.7 11.1 12.2 11.1 12.3.1.2.3.3.5.2.2-.1.3-.3.2-.5-.2-.6-4.6-14.7-12-12.8-8.3 2.1-8.5 29.6-8.6 30.8 0 .1.1.3.2.3Z"
                    className="cls-1"
                />
            </g>
        </svg>
    );
};