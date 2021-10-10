import{o as a,Y as u}from"./vendor.d082d2ac.js";const f=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};f();const c=["Id","Uuid","Name","Street","City","PIN","Age","Score","Percentage","Height","Weight","Volumne"],l=["myId","address","myName","Country","Depth","Marks","Percevt","mighty"],m={scorer:u},d=s=>{let r="";return s.forEach(o=>{r+=`<span> ${o} </span>`}),r},p=(s,r)=>{let o="";return s.forEach(n=>{o+=`
			<option ${n==r?"selected":""}>${n}</option>
		`}),o},y=(s,r)=>{let o="";return c.forEach(n=>{o+=`
			<tr>
				<td> ${n} </td>
				<td>
					<select>
						${p(l,a(n,l,m)[0][0])}
					</select>
				</td>
			</tr>
		`}),o};document.querySelector("#app").innerHTML=`
	<h1>Hello!</h1>
	<div>
		Source: <br />
		${d(c)}
	</div>

	<br /><br />

	<div>
		Destination: <br />
		${d(l)}
	</div>

	<br /><br />
	
	<table>
		${y()}
	</table>
`;
