
const users = require('../../hendler/user.hendler')




exports.createUser = async (req, res, next) =>{
  const user = await users.create({
    ...req.body
  });
  res.json(user)

}

exports.getUser = async (req, res, next) => {
  console.log('12323', req.user);
  res.json(await users.find({_id: req.user._id}, 'name email updatedAt createdAt'))
}

