'use strict';

module.exports = [
    /**
     * @api             {POST} /path/to/route sample route api
     * @apiName         sample_route
     * @apiVersion      1.0.0
     * @apiGroup        sample
     * @apiDescription  sample description for route
     * 
     * @apiParam    {String} param1      enum of `['mobile', 'email', 'mobile_new', 'email_new']`
     * @apiParam    {String} [param2]   users mobile no.
     * @apiParam    {String} [param3]    users email address
     * 
     */
    //{ method: 'POST', path: '/path/to/route', func: function (req, res) { /* handler method */ }, permissions: [] },
];
