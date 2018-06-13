const User = require('../models/user.model.js');

exports.create = (req, res) => {

	if (!req.body.name || !req.body.lastname) {
		return res.status(400).send({
			message: "El nombre y el apellido no pueden estar vacios"
		});
	}

	const user = new User({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		document: req.body.document || 0
	});

	user.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Ocurrio un error no se pudo crear el usuario."
			});
		});
};

exports.findAll = (req, res) => {
	User.find()
		.then(users => {
			res.send(users);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Ocurrio un error no se pudo obtener el listado de usuarios."
			});
		});
};

exports.findOne = (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			res.send(user);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			return res.status(500).send({
				message: "Error al obtener datos con el ID " + req.params.userId
			});
		});
};


exports.update = (req, res) => {
	
	if (!req.body.name || !req.body.lastname) {
		return res.status(400).send({
			message: "El nombre y el apellido no pueden estar vacios."
		});
	}

	User.findByIdAndUpdate(req.params.userId, {
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		document: req.body.document || 0
	}, { new: true })
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			res.send(user);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			return res.status(500).send({
				message: "Error al actualizar los datos con el ID " + req.params.userId
			});
		});
};

exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			res.send({ message: "El usuario ha sido eliminado!" });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "No se encuentra el usuario con el ID " + req.params.userId
				});
			}
			return res.status(500).send({
				message: "No se pudo eliminar al usuario con ID " + req.params.userId
			});
		});
};
