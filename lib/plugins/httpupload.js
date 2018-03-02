'use strict';


module.exports = function (client, stanzas) {

    client.disco.addFeature('urn:xmpp:http:upload');
    var NS = 'urn:xmpp:http:upload';
    var types = stanzas.utils;
    var Req = stanzas.define({
        name: 'request',
        element: 'request',
        namespace: NS,
        fields: {
            'xmlns': types.attribute('xmlns'),
            'filename': types.textSub(NS, 'filename'),
            'size': types.textSub(NS, 'size'),
            'content-type': types.textSub(NS, 'content-type')
        }
    });

    stanzas.withIQ(function (Iq) {
        stanzas.extend(Iq, Req);
    });
    client.requestSlot = function (opts, cb) {
        return this.sendIq({
            from: client.jid.bare,
            to: client.jid.domain,
            type: 'get',
            request: Object.assign({
                xmlns: 'urn:xmpp:http:upload'
            }, opts || {})
        }, cb);
    };
};