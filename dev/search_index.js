var documenterSearchIndex = {"docs":
[{"location":"interface/#The-AbstractSciMLOperator-Interface","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"","category":"section"},{"location":"interface/#Formal-Properties-of-DiffEqOperators","page":"The AbstractSciMLOperator Interface","title":"Formal Properties of DiffEqOperators","text":"","category":"section"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"These are the formal properties that an AbstractSciMLOperator should obey for it to work in the solvers.","category":"page"},{"location":"interface/#AbstractDiffEqOperator-Interface-Description","page":"The AbstractSciMLOperator Interface","title":"AbstractDiffEqOperator Interface Description","text":"","category":"section"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"Function call and multiplication: L(du,u,p,t) for inplace and du = L(u,p,t) for out-of-place, meaning L*u and mul!.\nIf the operator is not a constant, update it with (u,p,t). A mutating form, i.e. update_coefficients!(A,u,p,t) that changes the internal coefficients, and a out-of-place form B = update_coefficients(A,u,p,t).\nisconstant(A) trait for whether the operator is constant or not.","category":"page"},{"location":"interface/#AbstractDiffEqLinearOperator-Interface-Description","page":"The AbstractSciMLOperator Interface","title":"AbstractDiffEqLinearOperator Interface Description","text":"","category":"section"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"AbstractSciMLLinearOperator <: AbstractSciMLOperator\nCan absorb under multiplication by a scalar. In all algorithms things like dt*L show up all the time, so the linear operator must be able to absorb such constants.\nisconstant(A) trait for whether the operator is constant or not.\nOptional: diagonal, symmetric, etc traits from LinearMaps.jl.\nOptional: exp(A). Required for simple exponential integration.\nOptional: expv(A,u,t) = exp(t*A)*u and expv!(v,A::AbstractSciMLOperator,u,t) Required for sparse-saving exponential integration.\nOptional: factorizations. ldiv!, factorize et. al. This is only required for algorithms which use the factorization of the operator (Crank-Nicolson), and only for when the default linear solve is used.","category":"page"},{"location":"interface/#Note-About-Affine-Operators","page":"The AbstractSciMLOperator Interface","title":"Note About Affine Operators","text":"","category":"section"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"Affine operators are operators which have the action Q*x = A*x + b. These operators have no matrix representation, since if there was it would be a linear operator instead of an  affine operator. You can only represent an affine operator as a linear operator in a  dimension of one larger via the operation: [A b] * [u;1], so it would require something modified  to the input as well. As such, affine operators are a distinct generalization of linear operators.","category":"page"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"While it this seems like it might doom the idea of using matrix-free affine operators, it turns out  that affine operators can be used in all cases where matrix-free linear solvers are used due to an easy genearlization of the standard convergence proofs. If Q is the affine operator  Q(x) = Ax + b, then solving Qx = c is equivalent to solving Ax + b = c or Ax = c-b.  If you know do this same \"plug-and-chug\" handling of the affine operator in into the GMRES/CG/etc.  convergence proofs, move the affine part to the rhs residual, and show it converges to solving  Ax = c-b, and thus GMRES/CG/etc. solves Q(x) = c for an affine operator properly. ","category":"page"},{"location":"interface/","page":"The AbstractSciMLOperator Interface","title":"The AbstractSciMLOperator Interface","text":"That same trick then can be used pretty much anywhere you would've had a linear operator to extend  the proof to affine operators, so then exp(A*t)*v operations via Krylov methods work for A being  affine as well, and all sorts of things. Thus affine operators have no matrix representation but they  are still compatible with essentially any Krylov method which would otherwise be compatible with matrix-free representations, hence their support in the SciMLOperators interface.","category":"page"},{"location":"premade_operators/#Premade-SciMLOperators","page":"Premade SciMLOperators","title":"Premade SciMLOperators","text":"","category":"section"},{"location":"premade_operators/#Direct-Operator-Definitions","page":"Premade SciMLOperators","title":"Direct Operator Definitions","text":"","category":"section"},{"location":"premade_operators/","page":"Premade SciMLOperators","title":"Premade SciMLOperators","text":"ScalarOperator\nSciMLOperators.NullOperator\nMatrixOperator\nDiagonalOperator\nAffineOperator\nFunctionOperator","category":"page"},{"location":"premade_operators/#SciMLOperators.ScalarOperator","page":"Premade SciMLOperators","title":"SciMLOperators.ScalarOperator","text":"ScalarOperator(val[; update_func])\n\n(α::ScalarOperator)(a::Number) = α * a\n\nRepresents a time-dependent scalar/scaling operator. The update function is called by update_coefficients! and is assumed to have the following signature:\n\nupdate_func(oldval,u,p,t) -> newval\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.NullOperator","page":"Premade SciMLOperators","title":"SciMLOperators.NullOperator","text":"struct NullOperator{N} <: SciMLOperators.AbstractSciMLLinearOperator{Bool}\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.MatrixOperator","page":"Premade SciMLOperators","title":"SciMLOperators.MatrixOperator","text":"MatrixOperator(A[; update_func])\n\nRepresents a time-dependent linear operator given by an AbstractMatrix. The update function is called by update_coefficients! and is assumed to have the following signature:\n\nupdate_func(A::AbstractMatrix,u,p,t) -> [modifies A]\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.DiagonalOperator","page":"Premade SciMLOperators","title":"SciMLOperators.DiagonalOperator","text":"Diagonal Operator \n\n\n\n\n\n","category":"function"},{"location":"premade_operators/#SciMLOperators.AffineOperator","page":"Premade SciMLOperators","title":"SciMLOperators.AffineOperator","text":"L = AffineOperator(A, b)\nL(u) = A*u + b\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.FunctionOperator","page":"Premade SciMLOperators","title":"SciMLOperators.FunctionOperator","text":"Matrix free operators (given by a function)\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#Lazy-Operator-Compositions","page":"Premade SciMLOperators","title":"Lazy Operator Compositions","text":"","category":"section"},{"location":"premade_operators/","page":"Premade SciMLOperators","title":"Premade SciMLOperators","text":"SciMLOperators.ScaledOperator\nSciMLOperators.ComposedOperator\nSciMLOperators.AddedOperator\nSciMLOperators.InvertedOperator\nSciMLOperators.InvertibleOperator\nSciMLOperators.AdjointedOperator\nSciMLOperators.TransposedOperator","category":"page"},{"location":"premade_operators/#SciMLOperators.ScaledOperator","page":"Premade SciMLOperators","title":"SciMLOperators.ScaledOperator","text":"ScaledOperator\n\n(λ L)*(u) = λ * L(u)\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.ComposedOperator","page":"Premade SciMLOperators","title":"SciMLOperators.ComposedOperator","text":"Lazy operator composition\n\n∘(A, B, C)(u) = A(B(C(u)))\n\nops = (A, B, C)\ncache = (B*C*u , C*u)\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.AddedOperator","page":"Premade SciMLOperators","title":"SciMLOperators.AddedOperator","text":"Lazy operator addition\n\n(A1 + A2 + A3...)u = A1*u + A2*u + A3*u ....\n\n\n\n\n\n","category":"type"},{"location":"premade_operators/#SciMLOperators.InvertedOperator","page":"Premade SciMLOperators","title":"SciMLOperators.InvertedOperator","text":"Lazy Operator Inverse\n\n\n\n\n\n","category":"type"},{"location":"tutorials/fftw/#Wrap-a-Fourier-transform-with-SciMLOperators","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"","category":"section"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"In this tutorial, we will wrap a Fast Fourier Transform (FFT) in a SciMLOperator via the FunctionOperator interface. FFTs are commonly used algorithms for performing numerical interpolation and differentiation. In this example, we will use the FFT to compute the derivative of a function.","category":"page"},{"location":"tutorials/fftw/#Copy-Paste-Code","page":"Wrap a Fourier transform with SciMLOperators","title":"Copy-Paste Code","text":"","category":"section"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"using SciMLOperators\nusing LinearAlgebra, FFTW\n\nL  = 2π\nn  = 256\ndx = L / n\nx  = range(start=-L/2, stop=L/2-dx, length=n) |> Array\n\nu  = @. sin(5x)cos(7x);\ndu = @. 5cos(5x)cos(7x) - 7sin(5x)sin(7x);\n\ntransform = plan_rfft(x)\nk = Array(rfftfreq(n, 2π*n/L))\n\nop_transform = FunctionOperator(\n                                (du,u,p,t) -> mul!(du, transform, u);\n                                isinplace=true,\n                                T=ComplexF64,\n                                size=(length(k),n),\n\n                                input_prototype=x,\n                                output_prototype=im*k,\n\n                                op_inverse = (du,u,p,t) -> ldiv!(du, transform, u)\n                               )\n\nik = im * DiagonalOperator(k)\nDx = op_transform \\ ik * op_transform\n\nDx = cache_operator(Dx, x)\n\n@show ≈(Dx * u, du; atol=1e-8)\n@show ≈(mul!(copy(u), Dx, u), du; atol=1e-8)","category":"page"},{"location":"tutorials/fftw/#Explanation","page":"Wrap a Fourier transform with SciMLOperators","title":"Explanation","text":"","category":"section"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"We load SciMLOperators, LinearAlgebra, and FFTW (short for Fastest Fourier Transform in the West), a common Fourier transform library. Next, we define an equispaced grid from -π to π, and write the function u that we intend to differentiate. Since this is a trivial example, we already know the derivative, du and write it down to later test our FFT wrapper.","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"using SciMLOperators\nusing LinearAlgebra, FFTW\n\nL  = 2π\nn  = 256\ndx = L / n\nx  = range(start=-L/2, stop=L/2-dx, length=n) |> Array\n\nu  = @. sin(5x)cos(7x);\ndu = @. 5cos(5x)cos(7x) - 7sin(5x)sin(7x);\n","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"Now, we define the Fourier transform. Since our input is purely Real, we use the real Fast Fourier Transform. The funciton plan_rfft outputs a real fast fourier transform object that can be applied to inputs that are like x as follows: xhat = transform * x, and LinearAlgebra.mul!(xhat, transform, x).  We also get k, the frequency modes sampled by our finite grid, via the function rfftfreq.","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"transform = plan_rfft(x)\nk = Array(rfftfreq(n, 2π*n/L))","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"Now we are ready to define our wrapper for the FFT object. To FunctionOperator, we pass the in-place forward application of the transform, (du,u,p,t) -> mul!(du, transform, u), its inverse application, (du,u,p,t) -> ldiv!(du, transform, u), as well as input and output prototype vectors. We also set the flag isinplace to true to signal that we intend to use the operator in a non-allocating way, and pass in the element-type and size of the operator.","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"op_transform = FunctionOperator(\n                                (du,u,p,t) -> mul!(du, transform, u);\n                                isinplace=true,\n                                T=ComplexF64,\n                                size=(length(k),n),\n\n                                input_prototype=x,\n                                output_prototype=im*k,\n\n                                op_inverse = (du,u,p,t) -> ldiv!(du, transform, u)\n                               )","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"After wrapping the FFT with FunctionOperator, we are ready to compose it with other SciMLOperators. Below we form the derivative operator, and cache it via the function cache_operator that requires an input prototype. We can test our derivative operator both in-place, and out-of-place by comparing its output to the analytical derivative.","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"ik = im * DiagonalOperator(k)\nDx = op_transform \\ ik * op_transform\n\n@show ≈(Dx * u, du; atol=1e-8)\n@show ≈(mul!(copy(u), Dx, u), du; atol=1e-8)","category":"page"},{"location":"tutorials/fftw/","page":"Wrap a Fourier transform with SciMLOperators","title":"Wrap a Fourier transform with SciMLOperators","text":"≈(Dx * u, du; atol = 1.0e-8) = true\n≈(mul!(copy(u), Dx, u), du; atol = 1.0e-8) = true","category":"page"},{"location":"#SciMLOperators.jl:-The-SciML-Operators-Interface","page":"Home","title":"SciMLOperators.jl: The SciML Operators Interface","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Many functions, from linear solvers to differential equations, require the use of matrix-free operators in order to achieve maximum performance in many scenarios. SciMLOperators.jl defines the abstract interface for how operators in the SciML ecosystem are supposed to be defined. It gives the common set of functions and traits which solvers can rely on for properly performing their tasks. Along with that, SciMLOperators.jl provides definitions for the basic standard operators which are used in building blocks for most tasks, both simplifying the use of operators while also demonstrating to users how such operators can be built and used in practice.","category":"page"},{"location":"#Why-SciMLOperators?","page":"Home","title":"Why SciMLOperators?","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SciMLOperators.jl has the design that is required in order to be used in all scenarios of equation solvers. For example, Magnus integrators for differential equations require defining an operator u = A(t)u, while Munthe-Kaas methods require defining operators of the form u = A(u)u. Thus the operators need some form of time and state dependence which the solvers can update and query when they are non-constant (update_coefficients!). Additionally, the operators need the ability to act like \"normal\" functions for equation solvers. For example, if A(u,p,t) has the same operation as update_coefficients(A,u,p,t); A*u, then A can be used in any place where a differential equation definition f(u,p,t) is used without requring the user or solver to do any extra work. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Thus while previous good efforts for matrix-free operators have existed in the Julia ecosystem,  such as LinearMaps.jl, those operator interfaces lack these aspects in order to actually be fully seamless with downstream equation solvers. This necessitates the definition and use of an extended operator interface with all of these properties, hence the AbstractSciMLOperator interface.","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nJuliaDiffEq on Gitter\nOn the Julia Discourse forums (look for the modelingtoolkit tag\nSee also SciML Community page","category":"page"}]
}
