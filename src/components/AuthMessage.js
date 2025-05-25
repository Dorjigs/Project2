export default function AuthMessage() {
  return (
    <div className="container py-5 text-center">
      <div className="alert alert-warning">
        <h2>Authentication Required</h2>
        <p>Please sign in to view our expert guides.</p>
        <a href="/auth/signin" className="btn btn-primary">
          Sign In
        </a>
      </div>
    </div>
  );
}