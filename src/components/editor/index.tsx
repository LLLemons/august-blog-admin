import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'antd/lib/avatar';
import Engine, { EngineInterface } from '@aomao/engine';
import Redo from '@aomao/plugin-redo';
import Undo from '@aomao/plugin-undo';
import Bold from '@aomao/plugin-bold';
import Code from '@aomao/plugin-code';
import Backcolor from '@aomao/plugin-backcolor';
import Fontcolor from '@aomao/plugin-fontcolor';
import Fontsize from '@aomao/plugin-fontsize';
import Italic from '@aomao/plugin-italic';
import Underline from '@aomao/plugin-underline';
import Hr, { HrComponent } from '@aomao/plugin-hr';
import Tasklist, { CheckboxComponent } from '@aomao/plugin-tasklist';
import Orderedlist from '@aomao/plugin-orderedlist';
import Unorderedlist from '@aomao/plugin-unorderedlist';
import Indent from '@aomao/plugin-indent';
import Heading from '@aomao/plugin-heading';
import Strikethrough from '@aomao/plugin-strikethrough';
import Sub from '@aomao/plugin-sub';
import Sup from '@aomao/plugin-sup';
import Alignment from '@aomao/plugin-alignment';
import Mark from '@aomao/plugin-mark';
import Quote from '@aomao/plugin-quote';
import PaintFormat from '@aomao/plugin-paintformat';
import RemoveFormat from '@aomao/plugin-removeformat';
import SelectAll from '@aomao/plugin-selectall';
import Link from '@aomao/plugin-link';
import Codeblock, { CodeBlockComponent } from '@aomao/plugin-codeblock';
import Image, { ImageComponent, ImageUploader } from '@aomao/plugin-image';
import Toolbar, { ToolbarPlugin, ToolbarComponent } from '@aomao/toolbar';
import Table, { TableComponent } from '@aomao/plugin-table';
import './index.less';
import Repository from '@/pages/repository';

const plugins = [
  Redo,
  Undo,
  Bold,
  Code,
  Backcolor,
  Fontcolor,
  Fontsize,
  Italic,
  Underline,
  Hr,
  Tasklist,
  Orderedlist,
  Unorderedlist,
  Indent,
  Heading,
  Strikethrough,
  Sub,
  Sup,
  Alignment,
  Mark,
  Quote,
  PaintFormat,
  RemoveFormat,
  SelectAll,
  Link,
  Codeblock,
  Image,
  ImageUploader,
  ToolbarPlugin,
  Table,
];
const cards = [
  HrComponent,
  CheckboxComponent,
  CodeBlockComponent,
  ToolbarComponent,
  ImageComponent,
  TableComponent,
];

const isDev = process.env.NODE_ENV !== 'production';
const domain = isDev ? 'http://localhost:7001' : 'https://editor.aomao.com';

interface EditorProps {
  value: string;
  onChange: (v: string) => void;
}

const Editor = (props: EditorProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [engine, setEngine] = useState<EngineInterface>();
  useEffect(() => {
    if (!ref.current) return;
    //实例化引擎
    const engine = new Engine(ref.current, {
      plugins,
      cards,
      config: {
        [ImageUploader.pluginName]: {
          file: {
            action: `${domain}/upload/v1`,
          },
          remote: {
            action: `${domain}/upload/v1`,
          },
          isRemote: (src: string) => src.indexOf(domain) < 0,
        },
      },
    });
    //初始化本地协作，用作记录历史
    engine.ot.initLockMode();

    //监听编辑器值改变事件
    engine.on('change', (value) => {
      props.onChange(value);
    });
    setEngine(engine);
  }, []);
  useEffect(() => {
    engine?.setValue(props.value);
  }, [props.value]);
  return (
    <>
      {engine && (
        <Toolbar
          engine={engine}
          items={[
            ['collapse'],
            ['undo', 'redo', 'paintformat', 'removeformat'],
            ['heading', 'fontsize'],
            ['bold', 'italic', 'strikethrough', 'underline', 'moremark'],
            ['fontcolor', 'backcolor'],
            ['alignment'],
            ['unorderedlist', 'orderedlist', 'tasklist', 'indent'],
            ['link', 'quote', 'hr'],
          ]}
        />
      )}
      <div className="editor-wrapper">
        <div className="editor-container">
          <div ref={ref} />
        </div>
      </div>
    </>
  );
};
export default Editor;
