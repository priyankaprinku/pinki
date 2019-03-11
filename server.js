File Edit Options Buffers Tools Javascript Help                                                                                                                                       
        socket.name=user.name;
    });

    socket.on('group-message',(msg)=>{
        console.log(msg);
        let groupName='classgroup'+msg.to;

        io.in(groupName).emit('message',msg);
        console.log(groupName);

    })

});

app.post('/api/v1/conversation/group',(req,res)=>{

    let sql='select u.id from users u join students s on u.id=s.user_id where s.course_id=?';
    let sql1="insert ignore into messenger_threads set ?";

    let sql2='insert ignore into messenger_participants set ?';

    let sql3='insert into messenger_messages set ?';

    con.query(sql1,{
    con.query(sql,req.body.to,(err,userRows,fields)=>{

        if(err) throw err;
        else{

            for(let i=0;i<userRows.length;i++){
                console.log(userRows[i].id);
                con.query(sql2,{thread_id:req.body.to,user_id:userRows[i].id,created_at:new Date(),updated_at:new Date()},(err,rows,fields)=>{
                    if(err) throw err;
                    else{

                        console.log(rows);


                        con.query(sql3,{thread_id:req.body.to,user_id:userRows[i].id,body:req.body.message,created_at:new Date(),updated_at:new Date()},(err,rows,fields)=>{

                            if(err) throw err;
                        })
                    }
                })
            }
        }

    });
});
-UU-:**--F1  server.js      67% L271   (Javascript) ----------------------------------------------------------------------------------------------------------------------------------


