
{
    currentUser = await User.find({userName:req.params.userName});
    console.log(currentUser);
    if(currentUser.length!=0)
        res.send({"admin":currentUser[0].admin,"superAdmin":currentUser[0].superAdmin});
    else
        res.send("404");
}