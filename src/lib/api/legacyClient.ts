export async function sendFriendRequests(receiverId: string , currentUsername : string, receiverusername : string) {
  const res = await fetch("/api/Add_friend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      receiverId, status:'pending' , currentUsername , receiverusername 
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function DeleteFriendRequests(receiverId: string , senderId:string) {
  const res = await fetch("/api/Undo_request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      receiverId, senderId
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}


export async function CreateFriendship(receiverId: string , senderId:string , receiver_name:string , sender_name:string) {
  const res = await fetch("/api/Create_friend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      receiverId, senderId , status :'Accepted', receiver_name , sender_name
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function sendMessage(convo_id: string, friend_id: string, sender_id: string, message: string,Temp_id:string, replyto?:string) {
  const res = await fetch("/api/Send_message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      convo_id, friend_id, sender_id, message ,replyto,Temp_id
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function add_username(uid: string , name:string) {
  const res = await fetch("/api/Add_name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uid, name 
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function Manipulate_message(type: 'EDIT' | 'DELETE', Temp_id: string, convo_id: string , content?: string , type_delete?: string) {
  const res = await fetch("/api/Manipulate_message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content, type, Temp_id, convo_id , type_delete
      
     }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}