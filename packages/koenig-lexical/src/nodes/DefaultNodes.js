import {AsideNode} from './AsideNode';
import {AudioNode} from './AudioNode';
import {CalloutNode} from './CalloutNode';
import {CodeBlockNode} from './CodeBlockNode';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {HorizontalRuleNode} from './HorizontalRuleNode';
import {HtmlNode} from './HtmlNode';
import {ImageNode} from './ImageNode';
import {LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {MarkdownNode} from './MarkdownNode';
import {VideoNode} from './VideoNode';

const DEFAULT_NODES = [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    AsideNode,
    LinkNode,
    CodeBlockNode,
    HorizontalRuleNode,
    ImageNode,
    MarkdownNode,
    AudioNode,
    VideoNode,
    CalloutNode,
    HtmlNode
];

export default DEFAULT_NODES;
