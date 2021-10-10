import{o as g,Y as v}from"./vendor.d082d2ac.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}};y();let u="Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo",f="myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid",m=[],p=[];const O={scorer:v};let l=70,c={},i={},d={};const b=()=>{m=u.split(",").map(e=>e.trim()),p=f.split(",").map(e=>e.trim()),p.forEach(e=>{c[e]=g(e,m,O)});const r={};Object.entries(c).forEach(([e,n])=>{n.forEach(t=>{t[1]>0&&(Object.hasOwn(i,t[0])?i[t[0]].score<t[1]&&(i[t[0]]={dest:e,score:t[1]},r[e]?r[e]<t[1]&&t[1]>l&&(r[e]=t[1]):t[1]>l&&(r[e]=t[1])):(i[t[0]]={dest:e,score:t[1]},r[e]?r[e]<t[1]&&t[1]>l&&(r[e]=t[1]):t[1]>l&&(r[e]=t[1])))})}),console.log(r),Object.entries(i).forEach(([e,n])=>{Object.hasOwn(r,n.dest)&&n.score!=r[n.dest]&&(console.log(e,n.dest),delete i[e]),Object.hasOwn(r,n.dest)||delete i[e]}),console.log(i),Object.entries(i).forEach(([e,n])=>{d[n.dest]=e}),console.log(c,i,d)};b();const E=r=>{let e=Object.hasOwn(d,r)?"<option disabled> Please Select </option>":"<option selected disabled> Please Select </option>";return m.forEach((n,t)=>{e+=`
			<option ${n==d[r]?"selected":""}> ${n} </option>
		`}),e},S=()=>{let r="";return p.forEach(e=>{r+=`
			<tr>
				<td> ${e} </td>
				<td>
					<select>
						${E(e)}
					</select>
				</td>
			</tr>
		`}),r},h=()=>{document.querySelector("#app").innerHTML=`
		<h1>Hello!</h1>

		<div>
			Source: <br />
			<textarea id="source" rows="6">${u}</textarea>
		</div>

		<br /><br />

		<div>
			Destination: <br />
			<textarea id="destination" rows="6">${f}</textarea>
		</div>

		<br /><br />

		Select Fuzzy Score: <input type="range" min="1" max="100" value="${l}" id="myRange" oninput="this.nextElementSibling.value = this.value">
		<output>${l}</output>

		<br /><br />

		<input id="save" type="button" value="Save"/>

		<br /><br />
		<br /><br />

		<table border="1">
			${S()}
		</table>
	`,document.getElementById("save").addEventListener("click",()=>{u=document.getElementById("source").value,f=document.getElementById("destination").value,l=document.getElementById("myRange").value,c={},i={},d={},b(),h()})};h();
