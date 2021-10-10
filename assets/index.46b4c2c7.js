import{o as u,Y as m}from"./vendor.d082d2ac.js";const p=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};p();let a="myId, address, myName, Country, Depth, Marks, Percevt, mighty, help",d="Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark";const f={scorer:m};let l=50;const y=(i,r)=>{let n=r[0][1]>l,o=`<option ${n?"":"selected"} disabled>Please Select</option>`;return i.forEach((e,t)=>{o+=`
			<option ${e==r[0][0]&&n?"selected":""}>${e}</option>
		`}),o},b=(i,r)=>{let n=i.split(",").map(t=>t.trim()),o=r.split(",").map(t=>t.trim()),e="";return n.forEach(t=>{e+=`
			<tr>
				<td> ${t} </td>
				<td>
					<select>
						${y(o,u(t,o,f))}
					</select>
				</td>
			</tr>
		`}),e},c=()=>{document.querySelector("#app").innerHTML=`
		<h1>Hello!</h1>

		<div>
			Source: <br />
			<textarea id="source" rows="6">${d}</textarea>
		</div>

		<br /><br />

		<div>
			Destination: <br />
			<textarea id="destination" rows="6">${a}</textarea>
		</div>

		<br /><br />

		Select Fuzzy Score: <input type="range" min="1" max="100" value="${l}" id="myRange" oninput="this.nextElementSibling.value = this.value">
		<output>${l}</output>

		<br /><br />

		<input id="save" type="button" value="Save"/>

		<br /><br />
		<br /><br />

		<table border="1">
			${b(a,d)}
		</table>
	`,document.getElementById("save").addEventListener("click",()=>{console.log("click"),d=document.getElementById("source").value,a=document.getElementById("destination").value,l=document.getElementById("myRange").value,c()})};c();
