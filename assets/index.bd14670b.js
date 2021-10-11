import{o as h,Y as y}from"./vendor.d082d2ac.js";const g=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}};g();let d="Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo",u="myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid",m=[],p=[];const v={scorer:y};let s=60,a={},i={};const E=(e,n)=>{let r=!0;return Object.entries(a).forEach(([l,t])=>{t.forEach(o=>{o[0]==e&&o[1]>n&&(r=!1)})}),Object.hasOwn(i,e)||(r=!0,Object.entries(i).forEach(([l,t])=>{t==e&&(r=!1)})),r},O=()=>{Object.entries(a).forEach(([e,n])=>{n.forEach(r=>{r[1]>s&&E(r[0],r[1])&&(Object.hasOwn(i,e)||(i[e]=r[0]))})})},f=()=>{m=d.split(",").map(e=>e.trim()),p=u.split(",").map(e=>e.trim()),p.forEach(e=>{a[e]=h(e,m,v)}),O(),console.log(i)};f();const S=e=>{let n=Object.hasOwn(i,e)?"<option disabled> Please Select </option>":"<option selected disabled> Please Select </option>";return m.forEach((r,l)=>{n+=`
			<option ${r==i[e]?"selected":""}> ${r} </option>
		`}),n},j=()=>{let e="";return p.forEach(n=>{e+=`
			<tr>
				<td> ${n} </td>
				<td>
					<select>
						${S(n)}
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

		Select Fuzzy Score: <input type="range" min="1" max="100" value="${s}" id="myRange" oninput="this.nextElementSibling.value = this.value">
		<output>${s}</output>

		<br /><br />

		<input id="save" type="button" value="Save"/>

		<br /><br />
		<br /><br />

		<table border="1">
			${j()}
		</table>
	`,document.getElementById("save").addEventListener("click",()=>{d=document.getElementById("source").value,u=document.getElementById("destination").value,s=document.getElementById("myRange").value,a={},i={},f(),b()})};b();
