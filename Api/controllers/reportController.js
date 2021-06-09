const Report = require('../models/report');

exports.report =(req,res)=>{
    const {reporterId,reportedId,message} = req.query;
    const report = new Report({reporter:reporterId,reported:reportedId,message});
    report.save((err,report)=>{
        if(err){
            return res.status(400).send(err);
        }
        res.json(report);
    })
}
exports.deleteReport = async (req,res)=>{
    const repId=req.params.id;
    try {
        const report =await Report.findByIdAndDelete(repId);
        res.json(report);
    } catch (err){
        res.status(400).send(err);
    }
}

exports.showReportsByReported= async (req,res)=>{
    const idReported = req.params.id;
    try {
        const reports =await Report.find({reported:idReported});
        res.json(reports);
    } catch (err){
        res.status(400).send(err);
    }
}
exports.showReportsByReporter= async (req,res)=>{
    const idReporter = req.params.id;
    try {
        const reporters =await Report.find({reporter:idReporter});
        res.json(reporters);
    } catch (err){
        res.status(400).send(err);
    }
}