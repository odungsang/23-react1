# 201930421 이상현

# 11주차 23/05/11

# State 끌어올리기

## Shared State
- Shared State는 말 그대로 공유된 State를 의미한다.
- Shared State는 어떤 컴포넌트의 state에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우를 말한다.
- 이처럼 하위 컴포넌트가 공통된 부모 컴포넌트의 state를 공유하여 사용하는 것을 Shared State라고 한다.
<br><br>

## 하위 컴포넌트에서 State 공유하기
- 사용자로부터 온도를 입력받아서 각각 섭씨온도와 화씨온도로 표현해 주고 해당 온도에서 물이 끓는지 출력해주는 컴포넌트를 만들어 보면서 state를 공유하는 방법에 대해 보기.
```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }
  return <p>물이 끓지 않습니다.</p>;
}
```
- 섭씨온도값을 props로 받아 100c 이상이면 끟는다는 문자열을 출력하고 그 외에는 물이 끓지 않는다는 문자열을 출력한다.
이 컴포넌트를 실제로 사용하는  부모 컴포넌트를 만들어 본다.
```javascript
function Calculator(props){
    const[temperature,setTemperature]=useState('');
    const handleChange =(event)=>{
        setTemperature(event.target.value);
    }
    return(
        <fieldset>
        <legend>섭씨 온도를 입력하세요:</legend>
        <input
        value={temperature}
        onChange={handleChange}/>
        <BoilingVerdict
        celsius={parseFloat(temperature)}/>
        </fieldset>
    )
}
```

## 입력 컴포넌트 추출하기
- Calculator 컴포넌트 안에 온도를 입력하는 부분을 별도의 컴포넌트로 추출
- 이렇게 하는 이유는 섭씨온도와 화씨온도를 동시에 따로 입력받을수 있도록 하여 재사용이 가능한 형태로 컴포넌트를 만드는 것이 효율적이기 때문.
```javascript
const scaleNames={
    c:'섭씨',
    f:'화씨'
};
function TemperatureInput(props){
     const[temperature,setTemperature]=useState('');
    const handleChange =(event)=>{
        setTemperature(event.target.value);
    
}
return(
    <fieldset>
    <legend>온도를 입력해주세요(단위:{scaleNames[props.scale]}):</legend>
    <input value={temperature}onChange={handleChange}/>
    </fieldset>
)
}
```
- 온도를 입력받기 위한 TemperaturerInput 컴포넌트이다.
- 이렇게 추출한 컴포넌트를 사용하도록 Calculator 컴포넌트를 변경하면 아래와 같이 된다.
```javascript
function Calculator(props){
    return(
        <div>
        <TemperatureInput scale="c"/>
        <TemperatureInput scale="f"/>
        </div>
    )
}
```
- 위의 코드는 총 두개의 입력을 받을 수 있도록 되어있고, 하나는 섭씨온도를 입력받고, 하나는 화씨온도를 입력받는다.
- 하지만 문제가 발생하는데 사용자가 입력하는 온도값이 TemperatureInput 의 state에 저장되기 때문에 두개의 입력값이 동기화 되지 않는다.
<br><br>

## 온도 변환 함수 작성하기
- 먼저 섭씨온도와 화씨온도 값을 동기화시키기 위해서 각각 변환하는 함수가 필요하다 아래는 섭씨온도로 변환한느 함수와 섭씨온도를 화씨온도로 변환하는 함수이다.
```javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celcius) {
  return (celsius * 9 / 5) + 32;
}
```
- 이렇게 만든 함수를 호출하는 함수를 작성한다.
```javascript
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
- tryConvert()함수는 온도값과 변환하는 함수를 파라미터로 받아서 값을 변환시켜 리턴해주는 함수이다. 
- 만약 숫자가 아닌 값을 입력하면 empty string을 리턴하도록 예외 처리를 하였다 예시는 아래와 같다.
```javascript
tryConvert('abc', toCelsius); // 'empty string 을 리턴'
tryConvert('10.22', toFahrenheit); // '50.396을 리턴'
``` 
<br>

## Shared State 적용하기
- 다음으로는 하위 컴포넌트의 state를 공통된 부모 컴포넌트로 올려서 shared state를 적용해야한다.
- 여기서 state를 상위 컴포넌트로 올린다는 것을 State 끌어올리기 라고 표현한다.
- 이를 위해 먼저 TemperatureInput 컴포넌트에서 온도 값을 가져오는 부분을 수정해야한다.
```javascript
return(
    // 변경 전:<input value={temperature} onChange={handleChange}/>
    <input value={props.temperature}onChange={handleChange}/>
)
```
- 이렇게 하면 온도 값을 컴포넌트의 state에서 가져오는 것이 아닌 props로 가져오게 된다.
- 또한 컴포넌트의 state를 사용하지 않게 되므로 입력값이 변경되었을때 상위 컴포넌트로 변경된 값을 전달해주어야 한다.
```javascript
const handleChange = (event) => {
  // 변경 전: setTemperature(event.target.value);
  props.onTemperatureChange(event.target.value);
}
```
- 이제 사용자가 온도 값을 변경할 때마다 props에 있는 onTemperatureChange()함수를 호출하여 상위 컴포넌트로 변경된 값을 전달해준다.
- 최종적인 TemperatureInput 컴포넌트의 코드는 아래와 같다.
```javascript
function TemperatureInput(props){
    const handelChange=(event)=>{
        props.onTemperatureChange(event.target.value);
    }

    return(
      <fieldset>
        <legend>온도를 입력해 주세요(단위:{scaleNames[props.scale]}):</legend>

        <input value={props.temperature} onChange={handleChange} />
      </fieldset>
    )
  }
```
<br><br>

## Calculator 컴포넌트 변경하기
- 마지막으로 변경된 TemperatureInput 컴포넌트를 사용하도록 Calculator 컴포넌트를 변경해야한다.
```javascript
function Calculator(props){
    const [temperature,setTemperature]=useState('');
    const [scale,setScale]=useState('c');

    const handleCelsiusChange=(temperature)=>{
        setScale('c');
        setTemperature(temperature);
    }

    const handleFahrenheitChange=(temperature)=>{
        setScale('f');
        setTemperature(temperature);
    }

    const celsius=scale==='f'?tryConvert(temperature,toCelsius):temperature;
    const fahrenheit=scale==='c'?tryConvert(temperature,toFahrenheit):temperature;

    return(
        <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={handleCelsiusChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange}/>
        <BoilingVerdict celcius={parseFloat(celcius)}/>
        </div>
    )
}
```
1. 우선 state로 temperature와 scale을 선언하여 온도값과 온도의 단위를 저장한다.
2. 이 온도와 단위를 이용하여 변환 함수를 톤해 섭씨와 화씨온도를 구해서 사용한다.
3. TemperatureInput 컴포넌트를 사용하는 부분에서는 각 단위로 변환된 온도값을 props로 넣어주고, 값이 변경되엇을때 업데이트하기 위한 함수를 onTemperatureChange로 넣어준다.
4. 따라서 섭씨온도가 변경되면 단위가 'c'로 변경되고, 화씨온도가 변경되면 단위가 'f'로 변경된다.

## 정리
- 상위 컴포넌트인 Caculator 에서 온도 값과 단위를 각각의 state로 가지고 있으며 두 개의 상위 컴포넌트는 각각 섭씨와 화씨로 변환된 온도 값과 단위 그리고 온도를 업데이트하기 위한 함수를 props로 전달받는다.
- 이처럼 각 컴포넌트가 state에 값을 갖고 있는 것이 아니라 공통된 상위 컴포넌트로 올려서 공유하는 방법을 사용하면 리액트에서 더욱 간결하고 효율적인 코드를 작성할 수 있다.


<br><br>

# 10주차 23/05/04

# 리스트와 키

## 리스트와 키란 무었인가?
- 리스트는 자바스크립트의 변수나 객체를 하나의 변수로 묶어 놓은 배열과 같은 것이다.
- 키는 각 객체나 아이템을 구분할 수 있는 고유한 값을 의마한다.
- 리액트에서는 배열과 키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링 할 수 있다.
<br><br>

## 여러 개의 컴포넌트 렌더링하기
- 예의 에어비엔비의 화면처럼 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우 배열에 들어있는 엘리먼틀를 map() 함수를 이용하여 렌더링한다.
- 다음은 numbers 배열에 들어익는 각각의 요소를 map()를 이용하여 하나씩 추출하여, 2를 곱한 후 doubled라는 배열에 다시 넣는 코드이다.
```javascript
const doubled = numbers.map((number) => number * 2);
```
- 다음은 리액트에서 map()함수를 사용한 예제이다.
```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
- 이 코드는 numbers의 요소에 2를 곱하는 대신 li 태그를 결합해서 리턴하고 있다.
- 리턴된 listitems는 ul 태그와 결합해서 렌더링된다.
```javascript
ReactDom.render(
  <ul>
    <li>{1}</li>
    <li>{2}</li>
    <li>{3}</li>
    <li>{4}</li>
    <li>{5}</li>
  </ul>
  document.getElementById('root')
)
```
<br><br>

## 기본적인 리스트 컴포넌트
- 앞서 작성한 코드를 별도의 컴포넌트로 분리하면 다음과 같다.
- 이 컴포넌트는 props로 받은 숫자를 numbers로 받아 리스트로 렌더링해 준다.
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDom.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
- 이 코드를 실행하면 "리스트 아이템에 무조건 키가 있어야 한다" 는 경고 문구가 나온다.
- 경고 문구가 나오는 이유는 각각의 아이템에 key props가 없기 때문이다.
<br><br>

## 리스트의 키에 대해 알아보기
- 리스트에서의 키는 "리스트에서 아이템을 구별하기 위한 고유의 문자열" 이다.
- 이 키는 리스트에서 어떤 아이템이 변경, 추가 또는 제거되었는지 구분하기 위해 사용된다.
- 키는 같은 리스트에 잇는 엘리먼트 사이에서만 고유한 값이면 된다.
<br><br>
<br><br>


# 폼

## 폼이란 무었인가?
- 폼이란 일반적으로 사용자로부터 입력을 받기 위한 양식에서 많이 사용된다.
```javascript
// 사용예
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
## 제어 컴포넌트
- 제어 컴포넌트는 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트이다.
  1. HTML폼 자체적으로 state를 관리
  2. 제어 컴포넌트에서 state를 관리
- 다음 코드는 사용자의 이름을 입력 받는 HTML폼을 리액트 제어 컴포넌트로 만든 것이다.
```javascript
function NameForm(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleSubmit = (event) => {
    alert('입력한 이름 ' + value);
    event.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 : 
        <input type="text" value={value} onChange={handleChange}/>
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```
## textarea 태그
- HTML에서는 textarea 의 children으로 텍스트가 들어가는 형태이다.
```javascript
<textarea>
  안녕
</textarea>
```
- 리액트에서는 state를 통해 태그의 value라는 attribute를 변경하여 텍스트를 표시한다.
```javascript
function RequestForm(props) {
  const [value, setValue] = useState('요청사항을 입력하세요');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('입력한 요청사항 : ' + value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        요청사항 :
        <textarea value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  );
}
```
<br>

## select 태그
- select 태그도 textarea와 동일하다.
```javascript
<select>
  <option value="apple">사과</option>
  <option value="banana">바나나</option>
  <option value="orange">오렌지</option>
  <option value="grape">포도</option>
</select>

// 응용예시

...
...
return (
    <form onSubmit={handleSubmit}>
      <label>
        과일을 선택하세요.
        <textarea value={value} onChange={handleChange} />
        <select>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="orange">오렌지</option>
          <option value="grape">포도</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
  );
```
<br>

## File input 태그
- File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 된다.
```javascript
<input type="file"/>
```
<br><br>

## 여러 개의 입력 다루기기
```javascript
function Reservation(props) {
  const [haveBreakfast, setHaveBreakfast] = useState(true);
  const [numberOfGuest, setNumberOfGuest] = useState(2);

  const handleSubmit = (event) => {
    alert("아침식사 여부 : ${haveBreakfast}, 방문객 수: ${numberOfGuest}"); 
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        아침식사 여부 :
        <input type="checkbox" checked={haveBreakfast} 
        onChange={(event) => 
        setHaveBreakfast(event.target.checked)} />
      </label>
      <br />
      <label>
        방문객 수 :
        <input type="number" value={numberOfGuest} 
        onChange={(event) => 
        setNumberOfGuest(event.target.value)} />
      </label>
      <br />
      <button type="submit">제출</button>
    </form>
  );
}
```
<br>

## Input Null Value
- 제어 컴포넌트에 value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 입력값을 바꿀 수 없다.
- 만약 value prop은 넣되 자유롭게 입력 할 수 있게 만들고 싶다면 값에 undefined나 null을 넣으면 된다.
```javascript
ReactDom.render(<input value="hi" />, rootNode);

setTimeout(function(){
  ReactDom.render(<input value={null} />, rootNode);
}, 1000);
```




<br><br>

# 9주차 23/04/27

## 이벤트 핸들링

### 이벤트 처리하기

- DOM 에서 클릭 이벤트를 처리하는 예제 코드

```javascript
<button onclick = "activate()">
  Activate
</button >
```

- React에서 클릭 이벤트 처리하는 예제 코드

```javascript
<button onClick = {activate}>
  Activate
</button >
```
- 둘의 차이점은 <br>
1. 이벤트 이름이 onclick에서 onClick으로 변경(Camel case) <br>
2. 전달하려는 함수는 문자열에서 함수 그대로 전달. <br>

- 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수를 이벤트 핸들러라고 한다. <br>
- 또는 이벤트가 발생하는 것을 계속 듣고 있다는 의미로 이벤트 리스너라고도 한다.
<br><br>

### 이벤트 핸들러를 추가하는 방법은?

- 버튼을 클릭하면 이벤트 핸들러 함수인 handleClick() 함수를 호출하도록 되어 있다. <br>
- bind 를 사용하지 않으면 this.handleClick은 클로번 스코프에서 호출되어
undefined로 사용할 수 없기 때문이다. <br>
- bind 를 사용하지 않으려면 화살표 함수를 사용하는 방법도 있다. <br>
- 하지만 클래스 컴포넌트는 이제 거의 사용하지 않기 떄문에 이 내용은 참고만 한다. <br>

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // callback에서 `this`가 작동하려면 binding을 필수적으로 해줘야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? '켜짐' : '꺼짐'}
      </button>
    );
  }
}
``` 
<br><br>

### 클래스형을 함수형으로 바꾸면 다음과 같다.

- 함수형에서 이벤트 핸들러를 정의하는 방법은 두가지 이다.
- 함수형에서는 this를 사용하지 않고, onClick에서 바로 HandleClick() 함수를 넘기면 된다.
```javascript
function Toggle(props){
  const [isToggleOn, setIsToggleOn] = useState(true);

  // 방법 1. 함수 안에 함수로 정의
  function handleClick(){
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  // 방법 2. throw function을 사용해서 정의
  function handleClick = () => {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  return(
    <button onClick={handleClick}>
      {isToggleOn ? '켜짐' : '꺼짐'}
    </button>
  );
}
```
<br>

## Argument 전달하기
- 함수를 정의할 때는 파라미터(Parameter) 혹은 매개변수,
함수를 사용할 때는 아규먼트(Argument) 혹은 인수 라고 부른다.

- 이벤트 핸들러에 매개변수를 전달해야 하는 경우도 많습니다.
```javascript
<button onClick ={(event) => this.deleteItem(id, event)}>삭제하기</button>
<button onClick ={this.deleteItem.bind(this, id)}>삭제하기</button>
```
- 위의 코드는 모두 동일한 역할을 하지만 하나는 화살표 함수를, 다른 하나는 bind() 함수를 사용했다.
- event 라는 매개변수는 리액트의 이벤트 객체를 의미한다.
- 두 방법 모두 첫번째 매개변수는 id 이고 두번째 매개변수로 event를 전달한다.
- 첫번째 코드는 명시적으로 event를 매개변수로 넣어 주었고, 두번째 코드는 id 이후 두번째 매개변수로 event가 자동 전달된다(클래스형에서 사용하는 방법).
<br><br>

# 조건부 렌더링

## 조건부 렌더링이란?
- 여기서 조건이란 우리가 알고 있는 조건문의 조건이다.
```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```
- props로 전달 받은 isLoggedIn 이 true이면 UserGreeting을, false이면 GuestGreeting을 return한다.
- 이와 같은 렌더링을 조건부 렌더링이라고 한다.
<br><br>

### 엘리먼트 변수
- 렌더링해야 될 컴포넌트를 변수처럼 사용하는 방법이 엘리멘트 변수이다.
- 밑의 코드처럼 state에 따라 button 변수에 컴포넌트의 객체를 저장하여 return 문에서 사용하고 있습다.
```javascript
let button;
if (isLoggedIn) {
  button = <LogoutButton onClick={this.handleLogoutClick} />;
} else {
  button = <LoginButton onClick={this.handleLoginClick} />;
}
return(
  <div>
    <Greeting isLoggedIn={isLoggedIn} />
    {button}
  </div>
);
```
<br>

### 인라인 조건
- 필요한 곳에 조건문을 직접 넣어 사용하는 방법이다.

1. 인라인 if
- if문을 직접 사용하지 않고, 동일한 효과를 내기 위해 && 논리 연사자를 사용한다.
- &&는 and 연산자로 모든 조건이 참일때만 참여 됩니다.
- 첫번째 조건이 거짓이면 두번째 조건을 판단할 필요가 없다.
```javascript 
{unreadMessages.length > 0 &&
  <h2>
   현재 {unreadMessages.length} 개의 읽지 않은 메세지가 있습니다.
  </h2>
}
```
* 판단만 하지 않는 것이고 결과값은 그대로 리턴된다.
<br><br>

2. 인라인 if-else
- 삼항 연산자를 사용한다.  조건문 ? 참일때 : 거짓일때
- 문자열이나 엘리먼트를 넣어서 사용할 수도 있다.
<br><br>

### 컴포넌트 렌더링 막기
- 컴포넌트를 렌더링하고 싶지 않을 때에는 null을 리턴하면 된다.
```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div>경고!</div>
  );
}
```





<br><br>

# 8주차 중간고사 23/04/20 

## 훅을 이용한 리액트 앱 만들기

```javascript

import React, { useState } from 'react';

function FruitButton() {
  // useState hook을 사용하여 fruit state를 생성하고 기본값 설정
  const [fruit, setFruit] = useState("");

  return (
    <div style={{padding : 16}}>
      {/* 각 버튼을 클릭할 때마다 setFruit 함수를 호출하여 fruit state를 갱신한다 */}
      <h1 >{`어떤 과일을 좋아하나요?  ${fruit}`}</h1>
      <button style={{margin : 8}} onClick={() => setFruit('사과')}>사과</button>
      <button style={{margin : 8}} onClick={() => setFruit('오렌지')}>오렌지</button>
      <button style={{margin : 8}} onClick={() => setFruit('바나나')}>바나나</button> 
    </div>
  );
}

export default FruitButton;

```
<br><br>

# 7주차 23/04/13

## Hook(훅)이란 무엇인가?
- 클래스형 컴포넌트에서는 생성자에서 state를 정의하고, setstate() 함수를 사용해 state를 업데이트한다.
- 예전에 사용하던 함수형 컴포넌트에서는 state를 사용할 수 없었고, 컴포넌틔의 생명주기에 맞춰서 어떤 코드가 실행되도록 할 수 없었다.
- 함수형 컴포넌트에서도 state나 생명주기 함수의 기능을 사용하게 해주기 위해 추가된 기능이 바로 훅이다.
- 함수형 컴포넌트도 훅을 사용하여 클래스형 컴포넌트의 기능을 모두 구현하게 할 수 있다.
- Hook이란 state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행할 수 있게 해주는 함수이다.
- 훅의 이름은 모두 use로 시작한다.
- 사용자 정의 훅은 use로 시작하는 함수이다.
<br><br>

## useState
- useState는 함수형 컴포넌트에서 state를 사용할 수 있게 해주는 훅이다.
- 밑의 예제는 버튼을 클릭할 때마다 카운트가 증가하는 함수형 컴포넌트이다.
- 증가는 가능하지만 증가할때마다 제 렌더링은 일어나지 않는다.
- 이를 해결하기 위해서는 useState를 사용해야 한다.
- useState() 함수의 사용법은 다음과 같다.
- 첫번째 항목은 state의 이름(변수명) 이고,
- 두번째 항목은 state의 set 함수이다. 즉 state를 업데이트하는 함수이다.
- 함수를 호출할때 state의 초기값을 설정한다.
- 함수의 리턴 값은 배열의 형태이다.
```javascript
import React, { useState } from 'react';

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>현재{count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>
        클릭
      </button>
    </div>
  );
}

```
## useEffect
- useState와 함께 가장 많이 사용하는 Hook 이다.
- 이 함수는 사이드 이펙트를 수행할 수 있게 해준다.
- 영어로 side effect는 부작용을 의마하는데 일반적으로 프로그래밍에서 사이드 이펙트는 개발자가 의도하지 않은 코드가 실행되면서 발생하는 버그를 의미한다.
- 하지만 리액트에서는 효과 또는 영향을 뜻하는 effect라는 의미로 사용한다.
- 예를 들면 서버에서 데이터를 받아오거나 수동으로 DOM을 조작하는 것이다.
- 이 작업을 이펙트라고 부르는 이유는 이 작업들이 다른 컴포넌트에 영향을 미칠 수 있으면 렌더링 중에는 작업이 완료될 수 없기 때문이다. 렌더링이 끝난 이후에 실행되어야 하는 작업들이다.
- useEffect() 함수는 다음과 같이 사용한다.
- 첫번째 파라미터는 이펙트 함수가 들어가고, 두번째 파라미터로는 의존성 배열이 들어간다.
```javascript
useEffect(이펙트 함수, 의존성 배열);
``` 
- 의존성 배열은 이펙트가 의존하고 있는 배열로 배열 안에 있는 변수 중에 하나라도 값이 변경되면 이펙트 함수가 실행된다.
- 이펙트 함수는 처음 컴포넌트가 렌더링 된 이후, 그리고 재 렌더링 이후에 실행된다.
- 만약 이펙트 함수가 마운트와 언마운트 될 때만 한번씩 실행되게 하고 싶으면 빈 배열을 넣으면 된다.
- 의존성 배열을 생략하는 경우에는 업데이트 될 때마다 호출된다.


```javascript
import React, { useState, useEffect } from 'react';

function Counter(props) {
  const [count, setCount] = useState(0);
  // componentDidMount, componentDidUpdate와 비슷한 작동을 한다.
  useEffect(() => {
    // 브라우저 API를 사용해서 document의 title을 업데이트한다.
    document.title = `현재 ${count}번 클릭했습니다.`;
  });
  return (
    <div>
      <p>현재{count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>
        클릭
      </button>
    </div>
  );
}
```
<br>

* 정리하면 다음과 같다.
```javascript
useEffect(() => {
  // 컴포넌트가 마운트 된 이후,
  // 의존성 배열에 있는 변수들중 하나라도 값이 변경되면 실행됨
  // 의존성 배열에 빈 배열을 넣으면 마운트와 언마운트 될 때만 실행됨(단 한번식)
  // 의존성 배열 생략 시 컴포넌트가 업데이트 될 때마다 실행됨
  ...

  return () => {
    // 컴포넌트가 언마운트 되기 전에 실행됨
    ...
  }
},[의존성 변수1, 의존성 변수2, ...]);
```
<br>

## useMemo
- useMemo() 혹은 Memoizde value를 리턴하는 훅이다.
- 이전 계산값을 갖고 있기 때문에 연산량이 많은 작업의 반복을 피할 수 있다.
- 이 훅은 렌더링이 일어나는 동안 실행된다.
- 그러므로 렌더링이 일어나는 동안 실행되서는 안될 작업을 넣으면 안된다.
- 예를 들면 useEffect 에서 실행되어야 할 사이드 이펙트같은 것이다.
```javascript
const memoizedValue = useMemo(
  () => {
    // 연산량이 높은 작업을 수행하고 결과를 반환
    return computeExpensiveValue(a, b); //의존성 변수 a,b
  },
  [a, b]
);
```
- 다음 코드와 같이 의존성 배열을 넣지 않을 경우 렌더링이 일어날 때마다 함수가 실행된다.
```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
);
```
## useCallback
- useMemo와 유사한 역할
- 차이점은 useMemo는 값을 반환하고 useCallback은 함수를 반환한다.
- 의존성 배열을 파라미터로 받는 것은 useMemo롸 동일하다.
- 파라미터로 받은 함수를 콜백이라고 한다.
- useMemo와 마찬가지로 의존성 배열 중 하나라도 변경되면 콜백함수를 반환한다.
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b); //의존성 변수 a,b
  },
  [a, b],
);
```

<br>

## useRef
- useRef() 혹은 레퍼런스를 사용하기 위한 훅이다.
- 레퍼런스란 특정 컴포넌트에 접근 할 수 있는 객체이다.
- useRef() 혹은 바로 이 레퍼런스 객체를 반환한다.
- 레퍼런스 객체에는 .current 라는 속성이 있는데 이것은 현재 참조하고 있는 엘리먼트를 의미한다.
```javascript
const refContainer = useRef(초깃값);
```
- 이렇게 반환된 레퍼런스 객체는 컴포넌트의 라이프타임 전체에 걸쳐 유지된다.
- 즉 컴포넌트가 언마운트 전까지 계속 유지된다.
<br><br>

# 훅의 규칙

1. 첫번째 규칙은 무조건 최상의 레벨에서만 호출해야 한다. 여기서 최상위는 컴포넌트의 최상위를 의미한다.
- 따라서 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안 된다.
- 이 규칙에 따라서 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.
2. 두번째 규칙은 리액트 함수형 컴포넌트에서만 훅을 호출해야 한다는 것이다.
- 따라서 일반 자바스크립트 함수에서 훅을 호출하면 안 된다.
- 훅은 리액트의 함수형 컴포넌트 혹은 직접 만든 커스텀 훅에서만 호출해야 한다.
<br><br>

## 사용자 정의 훅 만들기 (커스텀 훅)
- 필요하다면 직접 훅을 만들어서 사용할 수 있다. 이것이 커스텀 훅이다. 
- state와 관련된 로직이 중복되는 경우에 render props 또는 HOC를 사용한다.
<br>

## 커스텀 훅 추출하기
- 두 개의 자바스크립트 함수에서 하나의 로직을 공유하도록 하고 싶을 때 새로운 함수를 하나 만드는 방법을 사용한다.
- 리액트 컴포넌트와 훅은 모두 함수이기 때문에 동일한 방법을 사용할 수 있다. 
- 주의할 점은 일반 컴포넌트와 마찬가지로 커스텀 훅도 반드시 최상위에서 호출해야 한다는 것이다.
- 커스텀 훅은 일반 함수와 같다고 생각해도 된다.
- 다만 이름을 use로 시작해야 한다는 것이다.



<br><br>

# 6주차 23/04/06

## 컴포넌트 추출
- 복잡한 컴포넌트를 쪼개서 여러 개의 컴포넌트로 나눌 수가 있다.
-  큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것이다.
- 실무에서는 처음부터 1개의 컴포넌트에 하나의 기능만 사용하도록 하는게 좋다.
<br><br>

## State와 생명주기
### 1. State란?
- State는 컴포넌트의 상태를 의미한다.
- 상태의 의미는 컴포넌트가 가지고 있는 데이터를 의미한다.
- 정확히는 컴포넌트의 변경가능한 데이터를 의미한다.
- State가 변하면 다시 렌더링이 되기 때문에 렌더링과 관련된 값만 State에 포함시켜야 한다.
<br><br>

### 2. State의  특징
- 리액트 만의 특별한 형태가 아닌 단지 자바스크립트 객체일 뿐이다.
- 예의 LikeButton은 class 컴포넌트이다.
- constructorsms 생성자이고 그 안에있는 this.state가 현 컴포넌트이 state이다.
* 함수형 에서는 useState()를 사용한다. 

```javascript
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       liked: false
      };
  }
}
```
- state는 변경은 가능하다고 했지만 직접 수정해서는 안된다.
- state를 변경하고자 할때는 setstate() 함수를 사용해야 한다.

```javascript
//state를 직접 수정(잘못된 사용법)
this.state = {
  name: 'React'
};
//setstate 함수를 통한 수정(정상적인 사용법)
this.setState  ({
  name: 'React'
});
```
### component vs. element vs. instance
- element - 재료
- component - 빵틀
- instance - 재료를 빵 틀에 넣고 만든 빵
<br>

## 생명주기에 대해 알아보기
- 생명주기는 컴포넌트의 생성 시점, 사용시점, 종료시점을 나타낸다.
- constructor가 실행, 되면서 컴포넌트가 생성된다.
- 생성 직후 componentDidMount() 함수가 호출된다.
- 컴포넌트가 소멸하기 전까지 여러 번 렌더링한다.
- 렌더링은 props,setState(), forceUpdate()에 의해 상태가 변경되면 이루어진다.
- 그리고 렌더링이 끝나면 componentDindUpdate() 함수가 호출된다.
- 마지막으로 컴포넌트가 언마운트되면 componentWillUnmount() 함수가 호출된다.
<br>






<br><br>

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