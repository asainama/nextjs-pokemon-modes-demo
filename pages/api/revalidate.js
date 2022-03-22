export default async function handle(req, res){
  for(const url of req.body){
    await res.unstable_revalidate(url);
  }
  res.status(200).json({revalidate: true});
}