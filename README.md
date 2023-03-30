# 201930421 이상현

# 5주차 23/03/30
## 엘리먼트에 대해 알아보기 <br>
### 1.엘리먼트의 정의 <br>
- 엘리먼트는 리액트 앱을 구성하는 요소를 의미한다.
- 엘리먼트는 리액트 앱의 가장 작은 빌딩 블록들 이다.
- 웹사이트의 경우는 DOM 엘리먼트이며 HTML요소를 의미합니다.
<br><br>

### 2.엘리먼트의 생김새
- 리액트 엘리먼트는 자바스크립트 객체의 형태로 존재한다.
- 컴포넌트, 속성 및 내부의 모든 children을 포함하는 일반 JS객체이다.
- 이 객체는 불변성을 가지고 있다.
<br><br>
버튼을 나태내기 위한 엘리먼트의 예
```javascript
const element = <button>Click me</button>;
```
<br>

- 리액트 엘리먼트의 예를 보면 type에 태그 대신 리액트 컴포넌트가 들어가 
있는 것 외에는 차이가 없다.<br>
- 자바스크립트 객체이다.<br><br> 

실제 createELement() 함수가 동작하는 과정이다.
아래 코드는 Button과 ConfirmDialog 컴포넌트고, ConfirmDialog는 Button을 포함한다.
```javascript
function Button(props) {
  return(
    <button className={"bg-${props.color}"}>
      <b>
        {props.children}
      </b>
    </button>;
  ) 
}

function ConfirmDialog(props) {
  return(
    <div>
      <p>내용을 확인하셨으면 확인 버튼을 눌러주세요.</p>
      <Button color="green">확인</Button>
    </div>
  );
}
```
<br><br>
ConfirmDialog 컴포넌트를 엘리먼트이 형태로 표시하려면 아래와 같이 작성한다.
```javascript
{
  type: 'div',
  props: {
    children: [
      {
        type: 'p',
        props: {
          children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
        }
      },
      {
        type: Button,
        props: {
          color: 'green',
          children: '확인'
        }
      }
    ]
  }
}
```
<br>

### 3.엘리먼트의 특징 <br>
- 엘리먼트는 불변성을 가진다. <br>
- 즉 한번 생성된 엘리먼트의 children이나 속성은 변경할 수 없다. <br>

### 만약 내용이 바뀐다면 어떻게 해야할까? <br>
- 이 때는 컴포넌트를 통해 새로운 엘리먼트를 생성하면 된다. <br>
- 그 다음 엘리먼트를 렌더링하면 된다. <br><br>

### 엘리먼트 렌더링하기 <br>
- 렌더링을 위해 ReactDOM.render() 함수를 사용한다. <br>
- 렌더링되는 과정은 Virtual DOM에서 실제 DOM으로 이동하는 과정이다. <br>

### 렌더링된 엘리먼트 업데이트하기 <br>
- 엘리먼트는 불변성을 가지고 있기 때문에 엘리먼트를 업데이트 하려면 다시 생성해야 한다. <br><br>

## 컴포넌트에 대해 알아보기 <br>
- 컴포넌트는 리액트 앱을 구성하는 빌딩 블록이다. <br>
- 컴포넌트는 엘리먼트를 반환하는 함수이다. <br>
- 컴포넌트는 속성을 받아서 엘리먼트를 반환한다. <br><br>


## Props에 대해 알아보기 <br>
1. ### props의 개념 <br>
- props는 prop의 준말이다.
- props는 컴포넌트의 속성을 의미한다.
- 컴포넌트에 어떤 속성을 넣느냐에 따라서 속성이 다은 엘리먼트가 출력된다.
- props는 컴포넌트에 전달 할 다양한 정보를 담고 있는 자바스크립트 객체이다.
- 에어비엔비의 예도 마찬가지이다.
<br><br>

2. ### Props의 특징 <br>
- props는 읽기 전용이다 변경 X.
- 속성이 다른 엘리먼트를 생성하려면 새로무 엘리먼트를 생성해야 한다.
<br><br>

### pure 함수와 impure 함수
- pure 함수는 인수로 받은 정보가 함수 내에서도 변하지 않는 함수.
- impure 함수는 인수로 받은 정보가 함수 내에서 변하는 함수.
<br><br>

3. ### Props의 사용법
- JSX에서는 key-value 쌍으로 props를 구성한다.
- JSX를 사용하지 않는 경우의 props의 전달 방법은 crateElement() 함수를 사용하는 것이다.
<br><br>

## 컴포넌트 만들기 <br>
1. ### 컴포넌트의 종류 <br>
- 리액트 초기 버전을 사용했을떄 클래스형 컴포넌트로 구현했다.
- 이후 Hook 이라는 개념이 나오면서 최근에는 함수형 컴포넌트를 사용한다.
- 예전에 작성된 코드나 문서들이 클래스형 컴포넌트로 작성되어 있기때문에 알아두어야 한다.
<br><br>

2. ### 함수형 컴포넌트 <br>
- Welcome 컴포넌트에는 props를 받아, 받은 props중 name키의 값을 "안녕" 뒤에 넣어 반환한다.
```javascript
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}
```
<br>

3. ### 클래스형 컴포넌트 <br>
- Welcome 컴포넌트는 React.Component class로부터 상속받아서 선언한다.
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>안녕, {this.props.name}</h1>;
  }
}
```
<br>

4. ### 컴포넌트 이름 찾기 <br>
- 이름은 항상 대문자로 시작해야 한다.
- 왜냐하면 리액트는 소문자로 시작하는 컴포넌트를 DOM 태그로 간주하기 때문이다.
- 컴포넌트 파일 이름과 컴포넌트 이름은 같게 한다.
<br><br>

5. ### 컴포넌트의 렌더링 <br>
- 렌더링의 방식은 다음 코드와 같다.
```javascript
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}

const element = <Welcome name="언제" />;
ReactDOM.render(
    element,
    document.getElementById('root');
);
```
<br><br>

## 컴포넌트 합성 <br>
- 컴포넌트 합성은 여러 개의 컴포넌트를 합쳐서 하나로 만드는 것이다.
- 리액트에서는 컴포넌트안에 또 다른 컴포넌트를 사용 할 수 있기때문에 복잡한 화면을 여러 개의 컴포넌트로 나누어서 구현 할 수 있다.
- 다음 코드에서는 props의 값을 다르게 해서 Welcome 컴포넌트를 여러번 사용한다.
```javascript
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}

function App(props) {
  return (
    <div>
      <Welcome name="Mike" />
      <Welcome name="Lee" />
      <Welcome name="Kim" />
    </div>
  );
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
<br>

---
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