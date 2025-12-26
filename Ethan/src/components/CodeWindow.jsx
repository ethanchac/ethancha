import { useEffect, useState, useRef } from 'react';

function CodeWindow({ phase, displayIntro, displayName, isTyping, editableIntro, editableName, editableTagline, onIntroChange, onNameChange, onTaglineChange }) {
  const [showCodeCursor, setShowCodeCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const introRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);

  // Check for completion - only set initial value once
  useEffect(() => {
    if (phase === 'done' && displayName === 'Ethan Cha' && !isComplete) {
      setTimeout(() => {
        setShowCodeCursor(false);
        setIsComplete(true);
      }, 500);
    }
  }, [phase, displayName, isComplete]);

  // Save cursor position
  const saveCursorPosition = (element) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  };

  // Restore cursor position
  const restoreCursorPosition = (element, position) => {
    const selection = window.getSelection();
    const range = document.createRange();

    let charCount = 0;
    let nodeStack = [element];
    let node, foundStart = false;

    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === 3) { // Text node
        const nextCharCount = charCount + node.length;
        if (position <= nextCharCount) {
          range.setStart(node, position - charCount);
          range.setEnd(node, position - charCount);
          foundStart = true;
        }
        charCount = nextCharCount;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    if (foundStart) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleIntroInput = (e) => {
    const newText = e.currentTarget.textContent;
    const cursorPos = saveCursorPosition(e.currentTarget);

    onIntroChange(newText);

    setTimeout(() => {
      if (introRef.current) {
        restoreCursorPosition(introRef.current, cursorPos);
      }
    }, 0);
  };

  const handleNameInput = (e) => {
    const newText = e.currentTarget.textContent;
    const cursorPos = saveCursorPosition(e.currentTarget);

    onNameChange(newText);

    setTimeout(() => {
      if (nameRef.current) {
        restoreCursorPosition(nameRef.current, cursorPos);
      }
    }, 0);
  };

  const handleTaglineInput = (e) => {
    const newText = e.currentTarget.textContent;
    const cursorPos = saveCursorPosition(e.currentTarget);

    onTaglineChange(newText);

    // Restore cursor after React re-renders
    setTimeout(() => {
      if (taglineRef.current) {
        restoreCursorPosition(taglineRef.current, cursorPos);
      }
    }, 0);
  };

  const handleIntroKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleTaglineKeyDown = (e) => {
    // Prevent line breaks
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // Determine which line the cursor is on based on typing state
  const getActiveLine = () => {
    if (!displayIntro) return -1;
    if (phase === 'intro' || phase === 'name-start' || phase === 'typo' || phase === 'delete' || phase === 'correct') {
      return 2; // Typing on the h1 line
    }
    return -1;
  };

  const activeLine = getActiveLine();

  return (
    <div className={`code-window ${isComplete ? 'code-complete' : ''}`}>
      {/* macOS Window Controls */}
      <div className="window-header">
        <div className="window-controls">
          <div className="window-dot window-dot-red"></div>
          <div className="window-dot window-dot-yellow"></div>
          <div className="window-dot window-dot-green"></div>
        </div>
        <div className="window-title">Hero.jsx</div>
      </div>

      {/* Code Content */}
      <div className="code-content">
        <pre className="code-pre">
          {/* Line 1 */}
          <div className="code-line">
            <span className="line-number">1</span>
            <code className="code-text">
              <span className="token-keyword">const</span>
              {' '}
              <span className="token-function">Hero</span>
              {' '}
              <span className="token-operator">=</span>
              {' '}
              <span className="token-punctuation">()</span>
              {' '}
              <span className="token-operator">=&gt;</span>
              {' '}
              <span className="token-punctuation">{'{'}</span>
            </code>
          </div>

          {/* Line 2 */}
          <div className="code-line">
            <span className="line-number">2</span>
            <code className="code-text">
              <span className="token-keyword">  return</span>
              {' '}
              <span className="token-punctuation">(</span>
            </code>
          </div>

          {/* Line 3 - Intro text */}
          <div className="code-line">
            <span className="line-number">3</span>
            <code className="code-text">
              <span className="token-indent">    </span>
              <span className="token-tag">&lt;p&gt;</span>
              {phase === 'done' && isComplete ? (
                <span
                  ref={introRef}
                  className="token-string editable-inline"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={handleIntroInput}
                  onKeyDown={handleIntroKeyDown}
                  spellCheck={false}
                >
                  {editableIntro}
                </span>
              ) : (
                <span className="token-string">
                  {displayIntro}
                </span>
              )}
              <span className="token-tag">&lt;/p&gt;</span>
              {phase === 'intro' && showCodeCursor && (
                <span className={isTyping ? "code-cursor-solid" : "code-cursor-blink"}>█</span>
              )}
            </code>
          </div>

          {/* Line 4 - Name */}
          <div className="code-line">
            <span className="line-number">4</span>
            <code className="code-text">
              <span className="token-indent">    </span>
              <span className="token-tag">&lt;h1&gt;</span>
              {phase === 'done' && isComplete ? (
                <span
                  ref={nameRef}
                  className="token-string editable-inline"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={handleNameInput}
                  onKeyDown={handleNameKeyDown}
                  spellCheck={false}
                >
                  {editableName}
                </span>
              ) : (
                <span className="token-string">
                  {displayName}
                </span>
              )}
              <span className="token-tag">&lt;/h1&gt;</span>
              {(phase === 'name-start' || phase === 'typo' || phase === 'delete' || phase === 'correct') && showCodeCursor && (
                <span className={isTyping ? "code-cursor-solid" : "code-cursor-blink"}>█</span>
              )}
            </code>
          </div>

          {/* Line 5 - Tagline */}
          <div className="code-line">
            <span className="line-number">5</span>
            <code className="code-text">
              <span className="token-indent">    </span>
              <span className="token-tag">&lt;p&gt;</span>
              <span
                ref={taglineRef}
                className={`token-string ${isComplete ? 'editable-inline' : ''}`}
                contentEditable={isComplete}
                suppressContentEditableWarning={true}
                onInput={handleTaglineInput}
                onKeyDown={handleTaglineKeyDown}
                spellCheck={false}
              >
                {editableTagline}
              </span>
              <span className="token-tag">&lt;/p&gt;</span>
            </code>
          </div>

          {/* Line 6 - LinkedIn link */}
          <div className="code-line">
            <span className="line-number">6</span>
            <code className="code-text">
              <span className="token-indent">    </span>
              <span className="token-tag">&lt;a</span>
              {' '}
              <span className="token-attr">href</span>
              <span className="token-punctuation">=</span>
              <span className="token-string">"http://linkedin.com/in/ethan-cha-5692b8372"</span>
              <span className="token-tag">&gt;</span>
            </code>
          </div>

          {/* Line 7 - Link text */}
          <div className="code-line">
            <span className="line-number">7</span>
            <code className="code-text">
              <span className="token-indent">      </span>
              <span className="token-string">contact_me.sh</span>
            </code>
          </div>

          {/* Line 8 - Closing tag */}
          <div className="code-line">
            <span className="line-number">8</span>
            <code className="code-text">
              <span className="token-indent">    </span>
              <span className="token-tag">&lt;/a&gt;</span>
            </code>
          </div>

          {/* Line 9 - Closing return */}
          <div className="code-line">
            <span className="line-number">9</span>
            <code className="code-text">
              <span className="token-keyword">  </span>
              <span className="token-punctuation">)</span>
            </code>
          </div>

          {/* Line 10 - Closing function */}
          <div className="code-line">
            <span className="line-number">10</span>
            <code className="code-text">
              <span className="token-punctuation">{'}'}</span>
            </code>
          </div>
        </pre>
      </div>
    </div>
  );
}

export default CodeWindow;
