import * as React from 'react';
import { PageChangeEvent, RenderPageProps, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, RenderHighlightsProps, Trigger } from '@react-pdf-viewer/highlight';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { chunkPlugin } from './chunkPlugin';


const urls = [
    "https://s3.us-east-1.amazonaws.com/api-staging.visorpro.ai/document_splits/by_50/24985d235b2d88f1f7032a52584f4482/00025.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAW3OITDVVSDDOLBSR%2F20240926%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240926T043758Z&X-Amz-Expires=604800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIBmNBy8sPdlTEUNGGLyKYLAI7I1UumvCHwqOYwLglEnuAiAExn3e1CJ3t%2Bc0AwcEOvmHWe%2BVyo1HOYnrRA3SoLousyrDBQj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDQ3MTI1NjQ3MjkzOSIM0soLvEnHdTUWF5osKpcFS2uDGO43lTu6EEvTwS2zVk883TPudLGDNPknsT18P0rCvdTDV%2F8TcXdlvVs1K%2FMiQ3maRDMyPS822ibEpdGhSL0MREgUxSMHGDkeXeIxYPmDODk%2BWPxCqzO%2FGOIKoZXvyoMe8uk%2BFB8WaKPkZRMxTcB3NrDOIPWnfvWrSoLaxOwifAcLtLuYn7Es88o98C1Di4BockqH3FEI5LV%2F%2Fq8zQDFY%2F%2B3CU0EcZfJVqtbBfr3C5UirUB0cTylCHylaVWjCG5W67FOyYwgu5r1btGpsnu%2BzK3yy5mUbtSqzSo12IcoZbb9pGPv2565QvjHIV3hfKR8Q%2BIopOyH2T3oa5NgQfjrnv7lyACvJvqRN7kB3CuY1UzKbKQekQF3D7Fm4%2BzB%2FjbtMoNvrMLUhCpoyE8hz9Z2Dh4n3T8Jvj9QrtM4wMfjg6fZj3kOwzZteBhjzmIxRl%2B3%2FTVVSj%2FS8deuOmGRkHePYMSEmsspBEkwwPIyUqNVp0D1Ix%2B6yy81Lh286yznZt56ojyYvtrJ7DD65N8uV3JCU5HjdJBKpY3yCSuCBHTZYvU08ijgo4lgUQPcAxta4M5hEo9tlrDjofEI4ry7DM%2B%2BssckhGd8r88TM%2BWdEQoOaUTd5uOUXzyAbBlRZb2qa5zsMhLQnn8KjJJhZx402orhwOzzyauSbcYOEKNjyMZxn%2FZdebrRMgPIH47FCx%2FGHQgUPqsyOPNGDblevbON1LEMjIrdn9EBmfY8mJUS2ElWLmPPwBrKZHu8G9uud5PmlxPvmJKcuo2CBXutYNC5w05HHukQUdAe%2BZQIU%2F8AGbzTcJoFvhaCL%2BrsjedynBZJs4hJeRSUc2uAUSI79D8%2FPSj7mHi4eSJp6L%2Fgdxi%2Bw4bg6VCg4Z%2B9%2FMIqx07cGOrIBw6DKbqEvSAynAAImQqibH1CrUqYy0Vhg8ZIDSH3BZu%2Fs0PBI3kL%2BY6Cn%2BydeNcmev7bp1wx1PHO7p50Uh95YnqoKcmMn6Ko1CxP4pn7WqPJFGzzYDkMpHRlfgOUow0qpfDW0wcx0O1OgkJfTDLC0rFcaYN8YxA4rz1iULTT751jETOjjM6KkTBeeDLKw4%2B41TwpwhvmmsMPHkApMvijC1frAbA%2F8ltwtggr0UJZCpsxFUg%3D%3D&X-Amz-Signature=11ed4101687c7708a0e7907faa9b829ddee05090d260ed394df3608bd991a89e&X-Amz-SignedHeaders=host&response-content-type=application%2Fpdf&x-id=GetObject",
    "https://s3.us-east-1.amazonaws.com/api-staging.visorpro.ai/document_splits/by_50/24985d235b2d88f1f7032a52584f4482/00000.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAW3OITDVVSDDOLBSR%2F20240926%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240926T043758Z&X-Amz-Expires=604800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIBmNBy8sPdlTEUNGGLyKYLAI7I1UumvCHwqOYwLglEnuAiAExn3e1CJ3t%2Bc0AwcEOvmHWe%2BVyo1HOYnrRA3SoLousyrDBQj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDQ3MTI1NjQ3MjkzOSIM0soLvEnHdTUWF5osKpcFS2uDGO43lTu6EEvTwS2zVk883TPudLGDNPknsT18P0rCvdTDV%2F8TcXdlvVs1K%2FMiQ3maRDMyPS822ibEpdGhSL0MREgUxSMHGDkeXeIxYPmDODk%2BWPxCqzO%2FGOIKoZXvyoMe8uk%2BFB8WaKPkZRMxTcB3NrDOIPWnfvWrSoLaxOwifAcLtLuYn7Es88o98C1Di4BockqH3FEI5LV%2F%2Fq8zQDFY%2F%2B3CU0EcZfJVqtbBfr3C5UirUB0cTylCHylaVWjCG5W67FOyYwgu5r1btGpsnu%2BzK3yy5mUbtSqzSo12IcoZbb9pGPv2565QvjHIV3hfKR8Q%2BIopOyH2T3oa5NgQfjrnv7lyACvJvqRN7kB3CuY1UzKbKQekQF3D7Fm4%2BzB%2FjbtMoNvrMLUhCpoyE8hz9Z2Dh4n3T8Jvj9QrtM4wMfjg6fZj3kOwzZteBhjzmIxRl%2B3%2FTVVSj%2FS8deuOmGRkHePYMSEmsspBEkwwPIyUqNVp0D1Ix%2B6yy81Lh286yznZt56ojyYvtrJ7DD65N8uV3JCU5HjdJBKpY3yCSuCBHTZYvU08ijgo4lgUQPcAxta4M5hEo9tlrDjofEI4ry7DM%2B%2BssckhGd8r88TM%2BWdEQoOaUTd5uOUXzyAbBlRZb2qa5zsMhLQnn8KjJJhZx402orhwOzzyauSbcYOEKNjyMZxn%2FZdebrRMgPIH47FCx%2FGHQgUPqsyOPNGDblevbON1LEMjIrdn9EBmfY8mJUS2ElWLmPPwBrKZHu8G9uud5PmlxPvmJKcuo2CBXutYNC5w05HHukQUdAe%2BZQIU%2F8AGbzTcJoFvhaCL%2BrsjedynBZJs4hJeRSUc2uAUSI79D8%2FPSj7mHi4eSJp6L%2Fgdxi%2Bw4bg6VCg4Z%2B9%2FMIqx07cGOrIBw6DKbqEvSAynAAImQqibH1CrUqYy0Vhg8ZIDSH3BZu%2Fs0PBI3kL%2BY6Cn%2BydeNcmev7bp1wx1PHO7p50Uh95YnqoKcmMn6Ko1CxP4pn7WqPJFGzzYDkMpHRlfgOUow0qpfDW0wcx0O1OgkJfTDLC0rFcaYN8YxA4rz1iULTT751jETOjjM6KkTBeeDLKw4%2B41TwpwhvmmsMPHkApMvijC1frAbA%2F8ltwtggr0UJZCpsxFUg%3D%3D&X-Amz-Signature=6a4f33d5993c25cc912f558c98d6b94f46f8a8d8716f2f0f7da6f1bbc3d12a00&X-Amz-SignedHeaders=host&response-content-type=application%2Fpdf&x-id=GetObject",
    "https://s3.us-east-1.amazonaws.com/api-staging.visorpro.ai/document_splits/by_50/8320f776940682486963ce910c283f4b/00000.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAW3OITDVVSDDOLBSR%2F20240926%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240926T043927Z&X-Amz-Expires=604800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIBmNBy8sPdlTEUNGGLyKYLAI7I1UumvCHwqOYwLglEnuAiAExn3e1CJ3t%2Bc0AwcEOvmHWe%2BVyo1HOYnrRA3SoLousyrDBQj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDQ3MTI1NjQ3MjkzOSIM0soLvEnHdTUWF5osKpcFS2uDGO43lTu6EEvTwS2zVk883TPudLGDNPknsT18P0rCvdTDV%2F8TcXdlvVs1K%2FMiQ3maRDMyPS822ibEpdGhSL0MREgUxSMHGDkeXeIxYPmDODk%2BWPxCqzO%2FGOIKoZXvyoMe8uk%2BFB8WaKPkZRMxTcB3NrDOIPWnfvWrSoLaxOwifAcLtLuYn7Es88o98C1Di4BockqH3FEI5LV%2F%2Fq8zQDFY%2F%2B3CU0EcZfJVqtbBfr3C5UirUB0cTylCHylaVWjCG5W67FOyYwgu5r1btGpsnu%2BzK3yy5mUbtSqzSo12IcoZbb9pGPv2565QvjHIV3hfKR8Q%2BIopOyH2T3oa5NgQfjrnv7lyACvJvqRN7kB3CuY1UzKbKQekQF3D7Fm4%2BzB%2FjbtMoNvrMLUhCpoyE8hz9Z2Dh4n3T8Jvj9QrtM4wMfjg6fZj3kOwzZteBhjzmIxRl%2B3%2FTVVSj%2FS8deuOmGRkHePYMSEmsspBEkwwPIyUqNVp0D1Ix%2B6yy81Lh286yznZt56ojyYvtrJ7DD65N8uV3JCU5HjdJBKpY3yCSuCBHTZYvU08ijgo4lgUQPcAxta4M5hEo9tlrDjofEI4ry7DM%2B%2BssckhGd8r88TM%2BWdEQoOaUTd5uOUXzyAbBlRZb2qa5zsMhLQnn8KjJJhZx402orhwOzzyauSbcYOEKNjyMZxn%2FZdebrRMgPIH47FCx%2FGHQgUPqsyOPNGDblevbON1LEMjIrdn9EBmfY8mJUS2ElWLmPPwBrKZHu8G9uud5PmlxPvmJKcuo2CBXutYNC5w05HHukQUdAe%2BZQIU%2F8AGbzTcJoFvhaCL%2BrsjedynBZJs4hJeRSUc2uAUSI79D8%2FPSj7mHi4eSJp6L%2Fgdxi%2Bw4bg6VCg4Z%2B9%2FMIqx07cGOrIBw6DKbqEvSAynAAImQqibH1CrUqYy0Vhg8ZIDSH3BZu%2Fs0PBI3kL%2BY6Cn%2BydeNcmev7bp1wx1PHO7p50Uh95YnqoKcmMn6Ko1CxP4pn7WqPJFGzzYDkMpHRlfgOUow0qpfDW0wcx0O1OgkJfTDLC0rFcaYN8YxA4rz1iULTT751jETOjjM6KkTBeeDLKw4%2B41TwpwhvmmsMPHkApMvijC1frAbA%2F8ltwtggr0UJZCpsxFUg%3D%3D&X-Amz-Signature=87f3a0fa60ae8d52e0aaa948416c69236a6c6916f52dab4b237b3b48efdfdd30&X-Amz-SignedHeaders=host&response-content-type=application%2Fpdf&x-id=GetObject",
]


const App = () => {
    const renderHighlights = (props: RenderHighlightsProps) => {
        const areas = [
            {
                pageIndex: 3,
                height: 1.55401,
                width: 28.1674,
                left: 27.5399,
                top: 15.0772,
            },
            {
                pageIndex: 3,
                height: 1.32637,
                width: 37.477,
                left: 55.7062,
                top: 15.2715,
            },
            {
                pageIndex: 3,
                height: 1.55401,
                width: 28.7437,
                left: 16.3638,
                top: 16.6616,
            },
        ]

        return (
            <div style={{ background: "#000" }}>AAA</div>
        )
    };

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const chunkPluginInstance = chunkPlugin({ urls });
    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
        trigger: Trigger.TextSelection,
    });

    const renderPage = (props: RenderPageProps) => {
        return <>
            {props.canvasLayer.children}
            {props.textLayer.children}
            {props.annotationLayer.children}
        </>
    }

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <div
                style={{
                    height: '1200px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Viewer
                    fileUrl={'./pdf-open-parameters.pdf'}
                    plugins={[defaultLayoutPluginInstance, chunkPluginInstance, highlightPluginInstance]}
                    renderPage={renderPage}
                />
            </div>
        </Worker>
    );
};

export default App;
