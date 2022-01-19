import Document, { Html, Head, Main, NextScript } from "next/document";

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <title>Todo App</title> */}
          <meta name="description" content="A simple todo app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-white circleBg selection:bg-teal-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
