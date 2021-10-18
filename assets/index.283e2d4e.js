import{o as h,Q as y}from"./vendor.66ac5553.js";const g=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};g();let d="Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo",u="myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid",m=[],p=[];const v={scorer:y};let a=60,s={},i={};const E=(e,o)=>{let n=!0;return Object.entries(s).forEach(([l,t])=>{t.forEach(r=>{r[0]==e&&r[1]>o&&(n=!1)})}),Object.hasOwn(i,e)||Object.entries(i).forEach(([l,t])=>{t==e&&(n=!1)}),n},O=()=>{Object.entries(s).forEach(([e,o])=>{o.forEach(n=>{n[1]>a&&E(n[0],n[1])&&(Object.hasOwn(i,e)||(i[e]=n[0]))})})},f=()=>{m=d.split(",").map(e=>e.trim()),p=u.split(",").map(e=>e.trim()),p.forEach(e=>{s[e]=h(e,m,v)}),console.log(s),O(),console.log(i)};f();const S=e=>{let o=Object.hasOwn(i,e)?"<option disabled> Please Select </option>":"<option selected disabled> Please Select </option>";return m.forEach((n,l)=>{o+=`
			<option ${n==i[e]?"selected":""}> ${n} </option>
		`}),o},j=()=>{let e="";return p.forEach(o=>{e+=`
			<tr>
				<td> ${o} </td>
				<td>
					<select>
						${S(o)}
					</select>
				</td>
			</tr>
		`}),e},b=()=>{document.querySelector("#app").innerHTML=`
		<h1>Hello!</h1>

		<div>
			Source: <br />
			<textarea id="source" rows="6">${d}</textarea>
		</div>

		<br /><br />

		<div>
			Destination: <br />
			<textarea id="destination" rows="6">${u}</textarea>
		</div>

		<br /><br />

		Select Fuzzy Score: <input type="range" min="1" max="100" value="${a}" id="myRange" oninput="this.nextElementSibling.value = this.value">
		<output>${a}</output>

		<br /><br />

		<input id="save" type="button" value="Save"/>

		<br /><br />
		<br /><br />

		<table border="1">
			${j()}
		</table>
	`,document.getElementById("save").addEventListener("click",()=>{d=document.getElementById("source").value,u=document.getElementById("destination").value,a=document.getElementById("myRange").value,s={},i={},f(),b()})};b();
