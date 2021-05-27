---
title: "next/link | Next.js 알아보기 🤔"
date: 2021-05-27T14:27:45+09:00
tags: ["nextjs"]
---
### Next.js | \<Link\>는 어떻게 동작할까?

nextjs로 서비스를 개발하고 운영중에 있는데, \<Link\>의 동작에 대해 궁금증이 생기게 되었다.  
👆🏻 nextjs코드를 까보기위한 개수작...

\<Link\> 컴포넌트의 props는 아래와 같다  
```jsx
{
  href: required,
  as: optional, 
  replace: optional,
  scroll: optional,
  shallow: optional,
  passHref: optional,
  prefetch: optional,
  locale: optional,
}
```
href값을 제외한 나머지 값들은 모두 옵셔널한 값이고, href는 필수값이다.

일반적으로 <a> 링크를 사용할때 링크를 클릭시 어딘가로 이동을 시키려면 아래와 같은 코드를 사용해왔다.
```jsx
<a href='/somewhere'>어딘가로 이동<a/>
```

nextjs에서 제공하는 next/link 컴포넌트를 이용하면 아래와 같이 작성 할 수 있다.
```jsx
<Link href='/somewhere'>
  <a>어딘가로 이동<a/>
</Link>
```
혹은
```jsx
<Link href='/somewhere'>어딘가로 이동</Link>
```

`어딘가로 이동`을 클릭하면 'linkClicekd()'함수를 호출하게 된다.  
아래 코드를 보면 크게 하는것은 없어보인다.  
클릭시 브라우저의 기본 이벤트를 막고 \<Link\>컴포넌트의 prop으로 전달된 동작(push | replace)를 수행하게 된다.  

```js
function linkClicked(
  e: React.MouseEvent,
  router: NextRouter,
  href: string,
  as: string,
  replace?: boolean,
  shallow?: boolean,
  scroll?: boolean,
  locale?: string | false
): void {
  const { nodeName } = e.currentTarget

  if (nodeName === 'A' && (isModifiedEvent(e) || !isLocalURL(href))) {
    // ignore click for browser’s default behavior
    return
  }

  e.preventDefault()

  //  avoid scroll for urls with anchor refs
  if (scroll == null) {
    scroll = as.indexOf('#') < 0
  }

  // replace state instead of push if prop is present
  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll,
  })
}
```

![index.tsx](/images/nextlink.png)  
추가로 \<Link\>의 자식으로 텍스트만 넣어줘도 렌더링 결과를보면 `<a>`로 감싸진걸 확인할수 있는데  
![index.html](/images/nextlink1.png)
```jsx
// Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag
if (typeof children === 'string') {
  children = <a>{children}</a>
}
```
위 코드를보면 이해가 된다. React prop에 담긴 children이 단순 스트링일 경우 `<a>`로 감싸게 된다.  

사실 오픈소스코드를 직접 열어본건 처음이라서 무엇을 정리해야할지 모르겠지만,  
평소 궁금하던 내용을 직접 열어보게되니 예상했던 코드와 또 그렇지 않은 코드들을 볼 수 있게되어 새로운 경험을 하게되는것 같다.


[next/link repo](https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx)  
[next/link | Next.js](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)