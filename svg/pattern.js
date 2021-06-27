import * as React from 'react';
function SvgComponent(props) {
    return (
        <svg
            width={375}
            height={227}
            viewBox="0 0 375 227"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <mask
                id="prefix__a"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={375}
                height={227}
            >
                <path fill="#9A0707" d="M0 0h375v227H0z" />
            </mask>
            <g mask="url(#prefix__a)">
                <path
                    fill="url(#prefix__pattern0)"
                    d="M-435-238H811v747.738H-435z"
                />
            </g>
            <defs>
                <pattern
                    id="prefix__pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use
                        xlinkHref="#prefix__image0"
                        transform="scale(.00028 .00046)"
                    />
                </pattern>
                <image
                    id="prefix__image0"
                    width={3601}
                    height={2161}
                />
            </defs>
        </svg>
    );
}
export default SvgComponent;