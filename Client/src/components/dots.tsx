import React, {useMemo, useRef} from 'react';
import {Group} from '@visx/group';
import {Circle} from '@visx/shape';
import {GradientPinkRed} from '@visx/gradient';
import {scaleLinear} from '@visx/scale';
import {PointsRange} from '@visx/mock-data/lib/generators/genRandomNormalPoints';
import {voronoi, VoronoiPolygon} from '@visx/voronoi';

export interface DotsProps {
    width: number;
    height: number;
    points: PointsRange[];
}

const x = (d: PointsRange) => d[0];
const y = (d: PointsRange) => d[1];

const Dots = ({width, height, points}: DotsProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const xScale = useMemo(
        () =>
            scaleLinear<number>({
                domain: [0.1, 10],
                range: [0, width],
                clamp: true,
            }),
        [width],
    );
    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                domain: [0.1, 10],
                range: [height, 0],
                clamp: true,
            }),
        [height],
    );
    const voronoiLayout = useMemo(
        () =>
            voronoi<PointsRange>({
                x: (d) => xScale(x(d)) ?? 0,
                y: (d) => yScale(y(d)) ?? 0,
                width,
                height,
            })(points),
        [width, height, xScale, yScale],
    );

    return (
        <div>
            <svg width={width} height={height} ref={svgRef}>
                <GradientPinkRed id="dots-pink"/>
                <rect
                    width={width}
                    height={height}
                    rx={14}
                    fill="url(#dots-pink)"
                />
                <Group pointerEvents="none">
                    {points.map((point, i) => (
                        <Circle
                            key={`point-${point[0]}-${i}`}
                            className="dot"
                            cx={xScale(x(point))}
                            cy={yScale(y(point))}
                            r={i % 3 === 0 ? 2 : 3}
                            fill={'#f6c431'}
                        />
                    ))}
                    {voronoiLayout
                        .polygons()
                        .map((polygon, i) => (
                            <VoronoiPolygon
                                key={`polygon-${i}`}
                                polygon={polygon}
                                fill="white"
                                stroke="white"
                                strokeWidth={1}
                                strokeOpacity={0.2}
                                fillOpacity={0}
                            />
                        ))}
                </Group>
            </svg>
        </div>
    );
};

export default Dots;