# 201930421 이상현
# 4주차 23/03/23

## JSX란? <br>
1. JSX는 자바스크립트의 확장 문법이다. <br>
2. JSX는 HTML과 비슷한 문법을 가지고 있다. <br>
3. Babel은 Jsx를 React.createElement() 호출로 컴파일한다. <br>
https://ko.reactjs.org/docs/introducing-jsx.html#gatsby-focus-wrapper

## Jsx의 역할 <br>
1. Jsx는 내부적으로 xml/html 코드를 자바스크립트로 변환한다. <br>
2. React가 createElement 함수를 사용하여 자동으로 자바스크립트로 변환.<br>
3. 만일 js 작업을 할 경우 직접 createElement 함수를 사용해야 한다. <br>
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
//JSX 미사용
```
<br>

```javascript
const element = <h1 className="greeting">Hello, world!</h1>;
//JSX 사용
```
<br>

## JSX의 장점 <br>
1. 코드가 간결해진다. <br>
2. 가독성이 좋아진다. <br>
3. injection Attack 이라 불리는 해킹방법을 방어하여 보안에 강하다. <br>

## JSX 사용법
1. JSX는 자바스크립트 표현식이다. <br>
2. 자바스크립트 문법에 xml/html 문법을 사용할 수 있다. <br>
3. 만일 html이나 xml에 자바스크립트를 사용하고 싶다면 {}를 사용한다. <br>
4. 아래 코드처럼 섞어서 사용한다.
```javascript
const name = 'Lee Sang Hyun';
const element = <h1>Hello, {name}</h1>;
```
<br>
태그의 속성값을 지정할 때는 따옴표를 사용하지 않고 중괄호를 사용한다. 

<br>

```javascript
//큰따옴표 사이에 문자열 넣기
const element = <div tabIndex="0"></div>;
```
<br>

---
# 3주차 23/03/16
## 리액트의 정의 <br>
사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리<br>
다양한 자바스크립트 ui프레임워크<br>                        
Stack Overflow에서 가장 많이 사용되는 프론트엔드 프레임워크<br><br>

## 리액트의 개념 정리<br>
복잡한 사이트를 쉽고 빠르게 만들고 유지보수하기 위한 라이브러리<br>
컴포넌트 기반의 UI 라이브러리<br>
컴포넌트는 재사용이 가능한 UI조각<br>
다른 표현으로는 spa를 쉽고 빠르게 만들 수 있게 도와주는 라이브러리<br><br>

## 리액트의 장점<br>
## 1. 빠른 업데이트와 렌더링 속도<br>
vitual dom을 사용하여 렌더링 속도를 높임<br>
vitual dom은 Dom 조작이 비효율적이기 때문에 고안된 방법이다.<br>
Dom은 동기식, virtual dom은 비동기식으로 렌더링한다.<br><br>

## 2. 컴포넌트 기반구조<br>
리액트의 모든 페이지는 컴포넌트로 구성되어 있다.<br>
하나의 컴포넌트는 다른 여러 개의 컴포넌트로 구성될 수 있다.<br>
컴포넌트는 재사용이 가능하다.<br><br>

## 3. 재사용성 <br>
반복적인 작업을 줄여주기 때문에 생산성을 높여준다.<br>
유지보수가 쉽다.<br>
재사용이 가능하려면 해당 모듈의 의존성이 없어야 한다.<br><br>

## 4. 든든한 지원군
facebook이 지원하고 있기 때문에 많은 개발자들이 사용하고 있다.<br>

## 5. 활발한 커뮤니티
<br>

## 6. 모바일 앱 개발에 적합
리액트 네이티브를 사용하여 모바일 앱을 개발할 수 있다.<br><br>

# 리액트의 단점<br>
## 1. 러닝커브가 높다.<br>
컴포넌트 기반의 개발이기 때문에 기존의 개발 방식과는 다르다.<br>

## 2. 높은 상태 관리 복잡도<br>
컴포넌트의 상태 관리가 어렵다.<br>





---




# 2주차
git이란 무엇인가 <br>
git의 기초 <br>
github 연동 및 개발환경 구축 <br>
pro git책 https://git-scm.com/book/ko/v2<br>