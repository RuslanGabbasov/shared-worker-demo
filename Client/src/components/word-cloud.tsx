import React from 'react';
import { Text } from '@visx/text';
import {scaleLog} from "@visx/scale";
import {Wordcloud} from "@visx/wordcloud";

export interface WordCloudProps {
    width: number;
    height: number;
    words: WordData[];
    needRotation?: boolean;
}

export interface WordData {
    text: string;
    value: number;
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
}

const WordCloud = ({words, width, height, needRotation}: WordCloudProps) => {
    const fontScale = scaleLog({
        domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
        range: [10, 100],
    });
    const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
    return (
        <div>
            <Wordcloud
                words={words}
                width={width}
                height={height}
                fontSize={fontSizeSetter}
                font={'IBM Plex Sans'}
                padding={2}
                spiral={'archimedean'}
                rotate={needRotation ? getRotationDegree : 0}
                random={() => 0.5}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <Text
                            key={w.text}
                            fill={colors[i % colors.length]}
                            textAnchor={'middle'}
                            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                        >
                            {w.text}
                        </Text>
                    ))
                }
            </Wordcloud>
        </div>
    );
};

export default WordCloud;