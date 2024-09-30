
import {
    PluginOnDocumentLoad,
    PluginRenderPageLayer,
    SpecialZoomLevel,
    createStore,
    type Plugin,
    type PluginFunctions,
    type RenderViewer,
    type Slot,
    type ViewerState,
    PdfJs,
    getPage,
    OpenFile,
    Store,
} from '@react-pdf-viewer/core';
import { useMemo, useState } from 'react';

export interface StoreProps {
    doc?: PdfJs.PdfDocument;
}

export interface ChunkPluginProps {
    urls: string[];
}

export const chunkPlugin = ({ urls }: ChunkPluginProps): Plugin => {
    const store = useMemo(() => createStore<StoreProps>(), []);

    const install = (pluginFunctions: PluginFunctions) => {
        const { getViewerState } = pluginFunctions;
        const state = getViewerState();
        console.log(state)
    }

    const onDocumentLoad = (props: PluginOnDocumentLoad) => {
        const { doc } = props;
        store.update('doc', doc);
    }

    const renderViewer = (props: RenderViewer): Slot => {
        const { slot, openFile } = props;

        const doc = store.get('doc');
        if (!doc) {
            return slot;
        }

        const updateSlot = {
            children: <>
                {slot.children}
            </>
        }
        return { ...slot, ...updateSlot }
    }

    const renderPageLayer = (props: PluginRenderPageLayer) => {
        const { doc } = props

        return <>
            <div style={{ position: 'absolute', top: 0, left: 0 }}>AAA</div>
        </>
    }

    // const getChunkPage = (pageIndex: number) => {
    //     return getPage(pdf, pageIndex)
    // }

    // const pdf: PdfJs.PdfDocument = {
    //     numPages: 100,
    //     getPage: getChunkPage,
    // }



    return {
        install,
        onDocumentLoad,
        renderViewer,
        renderPageLayer,
    }
}