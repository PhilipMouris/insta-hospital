import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

export default class Highlightable extends Component {
  render() {
    const { searchWords, textToHighlight, green } = this.props;
    if (!textToHighlight) return null;
    return (
      <Highlighter
        highlightClassName={green ? 'highlight-font-green' : 'highlight-font'}
        searchWords={searchWords}
        autoEscape={true}
        textToHighlight={textToHighlight}
      />
    );
  }
}
