const assert = require('assert');
const codemirror = require('../index');

describe('code highlighting', () => {
  it('go', () => {
    const code = `
package main


import "fmt"

func main() {
  fmt.Println("hello world")
}`;

    assert.equal(
      codemirror(code, 'go', 'text/x-go'),
      `
<span class="cm-keyword">package</span> <span class="cm-variable">main</span>


<span class="cm-keyword">import</span> <span class="cm-string">"fmt"</span>

<span class="cm-keyword">func</span> <span class="cm-variable">main</span>() {
  <span class="cm-variable">fmt</span><span class="cm-number">.</span><span class="cm-variable">Println</span>(<span class="cm-string">"hello world"</span>)
}`
    );
  });

  it('java', () => {
    const code = `
public class HelloWorld {
  public static void main(String[] args) {
    // Prints "Hello, World" to the terminal window.
    System.out.println("Hello, World");
  }
}`

    assert.equal(
      codemirror(code, 'clike', 'text/x-java'),
      `
<span class="cm-keyword">public</span> <span class="cm-keyword">class</span> <span class="cm-def">HelloWorld</span> {
  <span class="cm-keyword">public</span> <span class="cm-keyword">static</span> <span class="cm-type">void</span> <span class="cm-variable">main</span>(<span class="cm-type">String</span>[] <span class="cm-variable">args</span>) {
    <span class="cm-comment">&#47;&#47; Prints "Hello, World" to the terminal window.</span>
    <span class="cm-variable">System</span>.<span class="cm-variable">out</span>.<span class="cm-variable">println</span>(<span class="cm-string">"Hello, World"</span>);
  }
}`
    );
  });

  it('javascript', () => {
    assert.equal(
      codemirror("alert('Hello, World');", 'javascript', 'javascript'),
      `<span class="cm-variable">alert</span>(<span class="cm-string">'Hello, World'</span>);`
    );
  });

  it('kotlin (with a "clike" mode)', () => {
    const code = `
fun main() {
  println("Hello World!")
}`;

    assert.equal(
      codemirror(code, 'clike', 'text/x-kotlin'),
      `
<span class="cm-keyword">fun</span> <span class="cm-def">main</span>() {
  <span class="cm-variable">println</span>(<span class="cm-string">"Hello World!"</span>)
}`
    );
  });

  it('kotlin (with a "kotlin" mode)', () => {
    const code = `
fun main() {
  println("Hello World!")
}`;

    assert.equal(
      codemirror(code, 'kotlin', 'text/x-kotlin'),
      `
<span class="cm-keyword">fun</span> <span class="cm-def">main</span>() {
  <span class="cm-variable">println</span>(<span class="cm-string">"Hello World!"</span>)
}`
    );
  });

  it('php', () => {
    assert.equal(
      codemirror(`<?php echo "Hello, World";`, 'php', 'application/x-httpd-php'),
      `<span class="cm-meta">&lt;?php</span> <span class="cm-keyword">echo</span> <span class="cm-string">"Hello, World"</span>;`
    );
  });

  it('ruby', () => {
    assert.equal(
      codemirror(`puts 'Hello, world!'`, 'ruby', 'text/x-ruby'),
      `<span class="cm-variable">puts</span> <span class="cm-string">'Hello, world!'</span>`
    );
  });
});
