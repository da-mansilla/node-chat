$(()=>
{
	const socket = io();
	// DOM Elements
	const messageForm = $('#message-form');
	const messageBox = $('#message');
	const chat = $('#chat');

	const nickform = $('#nickForm');
	const nickname = $('#nickName');
	const nickerror = $('#nickError');
	const usernames = $('#usernames');


	nickform.submit(e=>
	{
		e.preventDefault();
		socket.emit('new-user', nickname.val(), (data)=>
			{
				if(data)
				{
					$('#nickWrap').hide();
					$('#contentWrap').show();
				}
				else
				{
					nickerror.html(
						`
						<div class="aler alert-danger">
							That Username already exits
						</div>
						`);
				}
				nickname.val('');
			});
	})
	// Eventos
	messageForm.submit((event)=>
	{
		event.preventDefault();
		socket.emit('send-message', messageBox.val(), data =>
			{
				chat.append(
					`
						<p class="error"> ${data} </p> 
					`)
			});
		messageBox.val('');
	});
	socket.on('new-message',(data)=>
	{
		chat.append('<b>'+data.nick + '</b>:'+ data.msg + '<br/>');
	});
	socket.on('usernames',(data)=>
	{
		let html = ``;
		for(let i=0; i < data.length; i++ )
		{
			html += `<p clas="text-secondary"><i class="fas fa-user mx-2"></i>${data[i]}</p>`
		}
		usernames.html(html);
	});
	socket.on('whisper', (data)=>
	{
		chat.append(
			`
			<p class="whisper"> <b> ${data.nick}:</b> ${data.msg}</p>
			`)
	});
	socket.on('load-old-msgs', data =>
	{
		for (let i = 0; i < data.length; i++)
		{
			chat.append('<b>'+data[i].nick + '</b>:'+ data[i].msg + '<br/>');
		}
	})
})