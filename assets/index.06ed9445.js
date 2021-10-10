import{o as a,Y as u}from"./vendor.d082d2ac.js";const m=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};m();let l="Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, Volumne, Register Date",c="myId, address, myName, Country, Depth, Marks, Percevt, mighty";const f={scorer:u},p=(s,o)=>{let n="";return s.forEach(r=>{n+=`
			<option ${r==o?"selected":""}>${r}</option>
		`}),n},y=(s,o)=>{const n=s.split(","),r=o.split(",");let e="";return n.forEach(t=>{e+=`
			<tr>
				<td> ${t} </td>
				<td>
					<select>
						${p(r,a(t,r,f)[0][0])}
					</select>
				</td>
			</tr>
		`}),e},d=()=>{document.querySelector("#app").innerHTML=`
		<h1>Hello!</h1>

		<div>
			Source: <br />
			<textarea id="source" rows="6">${l}</textarea>
		</div>

		<br /><br />

		<div>
			Destination: <br />
			<textarea id="destination" rows="6">${c}</textarea>
		</div>

		<input id="save" type="button" value="Save"/>

		<br /><br />

		<table border="1">
			${y(l,c)}
		</table>
	`,document.getElementById("save").addEventListener("click",()=>{console.log("click"),l=document.getElementById("source").value,c=document.getElementById("destination").value,d()})};d();
