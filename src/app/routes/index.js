const express = require('express')
const router  = express.Router();

router.get('/api', (req, res) => {
    return res.status(200).send({
        status: true,
        message: 'Api em execução',
        version: '1.0.0'
    })
})

module.exports = router